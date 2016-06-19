'use strict';

angular.module('klantenoverzicht', [
    'ui.router',
    'angularUtils.directives.dirPagination'
]);

angular.module('klantenoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('klantenoverzicht', {
        url: '/dashboard/klanten/overzicht',
        template: '<overzichtklant></overzichtklant>',
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

angular.module('klantenoverzicht').controller('KlantenOverizchtMenuCtrl', function ($scope) {
    $scope.title = 'Klanten overzicht';
    $scope.link = "/dashboard/klanten/overzicht";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Klanten toevoegen',
        'link': '/dashboard/klanten',
        'icon': 'fa-user-plus'
    }, {
        'text': 'Klanten overzicht',
        'link': '/dashboard/klanten/overzicht',
        'icon': 'fa-users',
        'active': 'active'
    }]
});

angular.module('klantenoverzicht').directive('overzichtklant', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/views/klanten/overzicht/klantenoverzicht.html',
        controllerAs: 'overzichtklant',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.perPage = 15;
            this.currentPage = 1;
            this.sort = {
                name: 1
            };

            this.klant = '';

            this.subscribe('klanten', () => [{

                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                sort: this.getReactively('sort')}
            ]);

            this.selectedKlant = (klant) => {
                this.klant = klant;
            }

            this.removeKlant = () =>  {
                Meteor.call('klanten.remove', this.klant);
            };


        }
    }
});
