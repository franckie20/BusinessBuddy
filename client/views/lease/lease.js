'use strict';

angular.module('lease', [
    'ui.router'
]);

angular.module('lease').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('lease', {
        url: '/dashboard/lease',
        templateUrl: 'client/views/lease/lease.html'
    });
});
