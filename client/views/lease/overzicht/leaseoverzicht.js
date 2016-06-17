'use strict';

angular.module('leaseoverzicht', [
    'ui.router'
]);

angular.module('leaseoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('leaseoverzicht', {
        url: '/dashboard/lease/overzicht',
        templateUrl: 'client/views/lease/overzicht/leaseoverzicht.html',
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