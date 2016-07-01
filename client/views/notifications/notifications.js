'use strict';

angular.module('notifications', [
    'ui.router'
]);

angular.module('notifications').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('notifications', {
        url: '/dashboard/notifications',
        //template: '<overzichtlease></overzichtlease>',
        resolve: {
            currentUser: ($q) => {
            var deferred = $q.defer();

            Meteor.autorun(function () {
                if (!Meteor.loggingIn()) {
                    if (Meteor.user() == null) {
                        deferred.reject('AUTH_REQUIRED');
                        window.location.href = '/users/sign_in';
                    } else {
                        deferred.resolve(Meteor.user());
                    }
                }
            });
    return deferred.promise;
            }
        }
    });
});

angular.module('notifications').directive('overzichtnotifications', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/views/notifications/notifications.html',
        controllerAs: 'notifications',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.perPage = 15;
            this.currentPage = 1;
            this.sort = {
                name: 1
            };

            this.removeNotification = (notification) => {
                Meteor.call('notifications.remove', notification);
            }

            this.subscribe('notifications', () => [{

                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                sort: this.getReactively('sort')}
            ]);

        }
    }
});