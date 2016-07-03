'use strict';

angular.module('werknemersoverzicht', [
    'ui.router'
]);

angular.module('werknemersoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('werknemersoverzicht', {
        url: '/dashboard/werknemers/overzicht',
        template: '<overzichtwerknemers></overzichtwerknemers>',
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

angular.module('werknemersoverzicht').controller('WerknemersOverzichtMenuCtrl', function ($scope) {
    $scope.title = 'Werknemers overzicht';
    $scope.link = "/dashboard/werknemers/overzicht";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Werknemers toevoegen',
        'link': '/dashboard/werknemers',
        'icon': 'fa-user-plus'
    }, {
        'text': 'Werknemers overzicht',
        'link': '/dashboard/werknemers/overzicht',
        'icon': 'fa-users',
        'active': 'active'
    }]
});


angular.module('werknemersoverzicht').directive('overzichtwerknemers', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/views/werknemers/overzicht/werknemersoverzicht.html',
        controllerAs: 'overzichtwerknemers',
        controller: function ($scope, $reactive, $state, $filter) {
            $reactive(this).attach($scope);

            this.werknemer = '';
            this.perPage = 15;
            this.currentPage = 1;
            this.sort = {
                name: 1
            };

            this.error = '';
            this.success = '';

            this.details = {
                _id: '',
                Naam: '',
                Email: '',
                Telefoon: '',
                Bedrijf: '',
                Start: '',
                Eind: ''
            };

            this.subscribe('werknemers', () => [{
                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                sort: this.getReactively('sort')}
            ]);

            this.selectedWerknemer = (werknemer) => {
                this.werknemer = werknemer;
                this.details._id = this.werknemer._id;
                this.details.Naam = this.werknemer.Naam;
                this.details.Email = this.werknemer.Email;
                this.details.Telefoon = this.werknemer.Telefoon;
                this.details.Bedrijf = this.werknemer.Bedrijf;
                this.details.Start = this.werknemer.Start;
                this.details.Start = $filter('date')(this.werknemer.Start, 'dd-MM-yyyy');
                this.details.Eind = this.werknemer.Eind;
                this.details.Eind = $filter('date')(this.werknemer.Eind, 'dd-MM-yyyy');
            }

            this.removeWerknemer = () => {
                Meteor.call('werknemers.remove', this.werknemer);
            }

            this.updateWerknemer = () => {
                var from = this.details.Start.split("-");
                var f = new Date(from[2], from[1] - 1, from[0]);
                this.details.Start = f;

                if(this.details.Eind != null) {
                    var fromEind = this.details.Eind.split("-");
                    var fEind = new Date(fromEind[2], fromEind[1] - 1, fromEind[0]);
                    this.details.Eind = fEind;
                }

                this.success = "Werknemer gewijzigd!";
                Meteor.call('werknemers.update', this.details);

            }
        }
    }
});