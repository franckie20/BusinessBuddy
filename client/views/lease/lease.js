'use strict';

angular.module('lease', [
    'ui.router'
]);

angular.module('lease').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('lease', {
        url: '/dashboard/lease',
        template: '<lease></lease>'
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

angular.module('lease').directive('lease', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/views/lease/lease.html',
        controllerAs: 'lease',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.info = {
                name: '',
                company: '',
                start: '',
                end:'',
                comments: ''
            };

            this.error = '';
            this.success = '';

            this.creating = () => {
                if (this.info.name != '' || this.info.company != '' || this.info.start != '' || this.info.end != '' || this.info.comments != '') {
                    Lease.insert(this.info);
                    this.success = "Successfully added contract " + this.info.name;
                } else {
                    this.error = 'error';
                }
            };
        }
    }
});
