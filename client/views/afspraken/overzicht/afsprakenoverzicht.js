'use strict';

angular.module('afsprakenoverzicht', [
    'ui.router'
]);

angular.module('afsprakenoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('afsprakenoverzicht', {
        url: '/dashboard/afspraken/overzicht',
        templateUrl: 'client/views/afspraken/overzicht/afsprakenoverzicht.html'
    });
});
