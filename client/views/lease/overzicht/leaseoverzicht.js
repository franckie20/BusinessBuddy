'use strict';

angular.module('leaseoverzicht', [
    'ui.router'
]);

angular.module('leaseoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('leaseoverzicht', {
        url: '/dashboard/lease/overzicht',
        templateUrl: 'client/views/lease/overzicht/leaseoverzicht.html'
    });
});
