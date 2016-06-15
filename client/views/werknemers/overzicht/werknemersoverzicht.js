'use strict';

angular.module('werknemersoverzicht', [
    'ui.router'
]);

angular.module('werknemersoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('werknemersoverzicht', {
        url: '/dashboard/werknemers/overzicht',
        templateUrl: 'client/views/werknemers/overzicht/werknemersoverzicht.html'
    });
});