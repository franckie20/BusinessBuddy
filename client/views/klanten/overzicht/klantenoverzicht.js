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

angular.module('klantenoverzicht').controller('KlantenOverizchtMenuCtrl', function ($scope) {
    $scope.title = 'Klanten overzicht';
    $scope.link = "/dashboard/klanten/overzicht";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Klanten toevoegen',
        'link': '/dashboard/klanten',
        'icon': 'fa-user-plus'
    }, {
        'text': 'Klanten overzicht',
        'link': '/dashboard/klanten/overzicht',
        'icon': 'fa-users',
        'active': 'active'
    }]
});