'use strict';

angular.module('werknemers', [
    'ui.router'
]);

angular.module('werknemers').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('werknemers', {
        url: '/dashboard/werknemers',
        templateUrl: 'client/views/werknemers/werknemers.html'
    });
});
