'use strict';

angular.module('werknemersoverzicht', [
    'ui.router'
]);

angular.module('werknemersoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('werknemersoverzicht', {
        url: '/dashboard/werknemers/overzicht',
        templateUrl: 'client/views/werknemers/overzicht/werknemersoverzicht.html',
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
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.perPage = 15;
            this.currentPage = 1;
            this.sort = {
                name: 1
            };

            this.removeWerknemer = (werknemer) => {
                Meteor.call('werknemers.remove', werknemer);
            }

            this.subscribe('werknemers', () => [{

                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                sort: this.getReactively('sort')}
            ]);

        }
    }
});