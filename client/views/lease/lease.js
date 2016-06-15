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

angular.module('lease').controller('LeaseMenuCtrl', function ($scope) {
    $scope.title = 'Lease toevoegen';
    $scope.link = "/dashboard/lease";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Nieuw leasecontract',
        'link': '/dashboard/lease',
        'icon': 'fa-newspaper-o',
        'active': 'active'
    }, {
        'text': 'Lease overzicht',
        'link': '/dashboard/lease/overzicht',
        'icon': 'fa-table'
    }]
});