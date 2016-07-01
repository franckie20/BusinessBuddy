'use strict';

angular.module('notificationsTaak', [
    'ui.router'
]);

angular.module('notificationsTaak').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('notificationsTaak', {
        url: '/dashboard/notifications/taak',
        template: '<overzichtnotificatietaak></overzichtnotificatietaak>',
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

angular.module('notificationsTaak').controller('NotificationsMenuCtrl', function ($scope) {
    $scope.title = 'Notificaties';
    $scope.link = "/dashboard/notifications";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Notificaties',
        'link': '/dashboard/notifications',
        'icon': 'fa-bell-o',
        'active': 'active'
    }]
});


angular.module('notificationsTaak').directive('overzichtnotificatietaak', function() {
    return {
        restrict: 'E',
        controllerAs: 'overzichtnotificatietaak',
        templateUrl: 'client/views/notifications/taak/notificationsTaak.html',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.perPage = 15;
            this.currentPage = 1;
            this.sort = {
                type: 1
            };

            this.isTaak = function(data) {
                return data.Type == "taak";
            }

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