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
                end:  '',
                comments: ''
            };

            this.error = '';
            this.success = '';

            this.creating = () => {
                Lease.insert(this.info, (err) => {
                    console.log('inserting...');
                    if (err) {
                        console.log('error..');
                        this.error = err;
                    }
                    else {
                        console.log('finished!');
                        this.success = "New contract created for " + this.info.name;
                    }
                });
            };
        }
    }
});
