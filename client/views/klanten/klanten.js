'use strict';

angular.module('klanten', [
    'ui.router'
]);

angular.module('klanten').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('klanten', {
        url: '/dashboard/klanten',
        templateUrl: 'client/views/klanten/klanten.html'
    });
});
