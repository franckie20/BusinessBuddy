'use strict';

angular.module('afsprakenoverzicht', [
    'ui.router'
]);

angular.module('afsprakenoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('afsprakenoverzicht', {
        url: '/dashboard/afspraken/overzicht',
        templateUrl: 'client/views/afspraken/overzicht/afsprakenoverzicht.html',
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

angular.module('afsprakenoverzicht').controller('kalender', function ($scope) {
    scheduler.init("scheduler_here", new Date());
    //Init dhtmlxScheduler data adapter.
    scheduler.meteor(TasksCollection);
});
