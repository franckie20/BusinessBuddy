'use strict';

angular.module('afspraken', [
    'ui.router'
]);

angular.module('afspraken').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('afspraken', {
        url: '/dashboard/afspraken',
        templateUrl: 'client/views/afspraken/afspraken.html'
    });
});
