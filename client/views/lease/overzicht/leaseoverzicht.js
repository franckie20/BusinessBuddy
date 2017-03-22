'use strict';

angular.module('leaseoverzicht', [
    'ui.router'
]);

angular.module('leaseoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('leaseoverzicht', {
        url: '/dashboard/lease/overzicht',
        template: '<overzichtlease></overzichtlease>',
        resolve: {
            currentUser: ($q) => {
                var deferred = $q.defer();

                Meteor.autorun(function () {
                    if (!Meteor.loggingIn()) {
                        if (Meteor.user() == null) {
                            deferred.reject('AUTH_REQUIRED');
                            window.location.href = '/users/sign_in';
                        } else {
                            deferred.resolve(Meteor.user());
                        }
                    }
                });
                return deferred.promise;
            }
        }
    });
});

angular.module('leaseoverzicht').controller('LeaseOverzichtMenuCtrl', function ($scope) {
    $scope.title = 'Lease overzicht';
    $scope.link = "/dashboard/lease/overzicht";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Nieuw leasecontract',
        'link': '/dashboard/lease',
        'icon': 'fa-newspaper-o'
    }, {
        'text': 'Lease overzicht',
        'link': '/dashboard/lease/overzicht',
        'icon': 'fa-table',
        'active': 'active'
    }]
});

angular.module('leaseoverzicht').directive('overzichtlease', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/views/lease/overzicht/leaseoverzicht.html',
        controllerAs: 'overzichtlease',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.perPage = 15;
            this.currentPage = 1;
            this.sort = {
                name: 1
            };

            this.subscribe('leasecontracts', () => [{
                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                sort: this.getReactively('sort')}
            ]);

            this.details = {
                _id: '',
                Bestuurder: {
                    _id: '',
                    username: '',
                    profile: {
                        name: '',
                    }
                },
                Bedrijf: '',
                Startdatum: '',
                Einddatum: '',
                Opmerkingen: ''
            };

            this.selectedLease = (lease) => {
                this.lease = lease;
                this.details._id = this.lease._id;
                this.details.Bestuurder = this.lease.Bestuurder;
                this.details.Bedrijf = this.lease.Bedrijf;
                this.details.Startdatum = this.lease.Startdatum;
                this.details.Einddatum = this.lease.Einddatum;
                this.details.Opmerkingen = this.lease.Opmerkingen;
            }

            this.updateLease = () => {
                Meteor.call('lease.update', this.details);
            }

            this.removeLease = () =>  {
                Meteor.call('lease.remove', this.lease);
            }

        }
    }
});