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

angular.module('afspraken').controller('AfsprakenMenuCtrl', function ($scope) {
    $scope.title = 'Afspraken toevoegen';
    $scope.link = "/dashboard/afspraken";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Nieuwe afspraak',
        'link': '/dashboard/afspraken',
        'icon': 'fa-plus-square-o',
        'active': 'active'
    }, {
        'text': 'Afspraken overzicht',
        'link': '/dashboard/afspraken/overzicht',
        'icon': 'fa-table'
    }]
});
