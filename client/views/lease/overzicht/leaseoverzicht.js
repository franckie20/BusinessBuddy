'use strict';

angular.module('leaseoverzicht', [
    'ui.router'
]);

angular.module('leaseoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('leaseoverzicht', {
        url: '/dashboard/lease/overzicht',
        templateUrl: 'client/views/lease/overzicht/leaseoverzicht.html'
    });
});

angular.module('leaseoverzicht').controller('LeaseOverzichtMenuCtrl', function ($scope) {
    $scope.title = 'Lease overzicht';
    $scope.link = "/dashboard/lease/overzicht";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Nieuw leasecontract',
        'link': '/dashboard/lease',
        'icon': 'fa-newspaper-o'
    }, {
        'text': 'Lease overzicht',
        'link': '/dashboard/lease/overzicht',
        'icon': 'fa-table',
        'active': 'active'
    }]
});