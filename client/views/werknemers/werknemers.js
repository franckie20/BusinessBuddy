'use strict';

angular.module('werknemers', [
    'ui.router'
]);

angular.module('werknemers').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('werknemers', {
        url: '/dashboard/werknemers',
        templateUrl: 'client/views/werknemers/werknemers.html',
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

angular.module('werknemers').controller('WerknemersMenuCtrl', function ($scope) {
    $scope.title = 'Werknemers toevoegen';
    $scope.link = "/dashboard/werknemers";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Werknemers toevoegen',
        'link': '/dashboard/werknemers',
        'icon': 'fa-user-plus',
        'active': 'active'
    }, {
        'text': 'Werknemers overzicht',
        'link': '/dashboard/werknemers/overzicht',
        'icon': 'fa-users'
    }]
});
