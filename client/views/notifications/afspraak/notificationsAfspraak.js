'use strict';

angular.module('notificationsAfspraak', [
    'ui.router'
]);

angular.module('notificationsAfspraak').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('notificationsAfspraak', {
        url: '/dashboard/notifications/afspraak',
        template: '<overzichtnotificatieafspraak></overzichtnotificatieafspraak>',
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

angular.module('notificationsAfspraak').controller('NotificationsMenuCtrl', function ($scope) {
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


angular.module('notificationsAfspraak').directive('overzichtnotificatieafspraak', function() {
    return {
        restrict: 'E',
        controllerAs: 'overzichtnotificatieafspraak',
        templateUrl: 'client/views/notifications/afspraak/notificationsAfspraak.html',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.perPage = 15;
            this.currentPage = 1;
            this.sort = {
                type: 1
            };

            var modal = angular.element(document.querySelector('div.modal-backdrop'));
            if(modal != null) {
                modal.remove();
            }

            this.isAfspraak = function(data) {
                return data.Type == "afspraak";
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