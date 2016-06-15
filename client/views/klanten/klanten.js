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

angular.module('klanten').controller('KlantenMenuCtrl', function ($scope) {
    $scope.title = 'Klanten toevoegen';
    $scope.link = "/dashboard/klanten";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Klanten toevoegen',
        'link': '/dashboard/klanten',
        'icon': 'fa-user-plus',
        'active': 'active'
    }, {
        'text': 'Klanten overzicht',
        'link': '/dashboard/klanten/overzicht',
        'icon': 'fa-users'
    }]
});
