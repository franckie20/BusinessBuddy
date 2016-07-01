'use strict';

angular.module('notificationsLease', [
    'ui.router'
]);

angular.module('notificationsLease').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('notificationsLease', {
        url: '/dashboard/notifications/lease',
        template: '<overzichtnotificatielease></overzichtnotificatielease>',
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

angular.module('notificationsLease').controller('NotificationsMenuCtrl', function ($scope) {
    $scope.title = 'Notificaties';
    $scope.link = "/dashboard/notifications/afspraak";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Notificaties',
        'link': '/dashboard/notifications',
        'icon': 'fa-bell-o',
        'active': 'active'
    }]
});


angular.module('notificationsLease').directive('overzichtnotificatielease', function() {
    return {
        restrict: 'E',
        controllerAs: 'overzichtnotificatielease',
        templateUrl: 'client/views/notifications/lease/notificationsLease.html',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.perPage = 15;
            this.currentPage = 1;
            this.sort = {
                type: 1
            };

            this.isLease = function(data) {
                return data.Type == "lease";
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