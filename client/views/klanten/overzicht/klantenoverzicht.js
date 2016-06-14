'use strict';

angular.module('klantenoverzicht', [
    'ui.router'
]);

angular.module('klantenoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('klantenoverzicht', {
        url: '/dashboard/klanten/overzicht',
        templateUrl: 'client/views/klanten/overzicht/klantenoverzicht.html'
    });
});
