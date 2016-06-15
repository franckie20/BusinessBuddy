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

angular.module('werknemersoverzicht').controller('WerknemersOverzichtMenuCtrl', function ($scope) {
    $scope.title = 'Werknemers overzicht';
    $scope.link = "/dashboard/werknemers/overzicht";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Werknemers toevoegen',
        'link': '/dashboard/werknemers',
        'icon': 'fa-user-plus'
    }, {
        'text': 'Werknemers overzicht',
        'link': '/dashboard/werknemers/overzicht',
        'icon': 'fa-users',
        'active': 'active'
    }]
});
