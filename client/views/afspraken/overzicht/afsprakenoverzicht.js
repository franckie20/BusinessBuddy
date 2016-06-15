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

angular.module('afsprakenoverzicht').controller('AfsprakenOverzichtMenuCtrl', function ($scope) {
    $scope.title = 'Afspraken overzicht';
    $scope.link = "/dashboard/afspraken/overzicht";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Nieuwe afspraak',
        'link': '/dashboard/afspraken',
        'icon': 'fa-plus-square-o'
    }, {
        'text': 'Afspraken overzicht',
        'link': '/dashboard/afspraken/overzicht',
        'icon': 'fa-table',
        'active': 'active'
    }]
});
