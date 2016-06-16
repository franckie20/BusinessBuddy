'use strict';

angular.module('klantenoverzicht', [
    'ui.router',
    'angularUtils.directives.dirPagination'
]);

angular.module('klantenoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('klantenoverzicht', {
        url: '/dashboard/klanten/overzicht',
        templateUrl: 'client/views/klanten/overzicht/klantenoverzicht.html',
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

angular.module('klantenoverzicht').controller('KlantenOverizchtMenuCtrl', function ($scope) {
    $scope.title = 'Klanten overzicht';
    $scope.link = "/dashboard/klanten/overzicht";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Klanten toevoegen',
        'link': '/dashboard/klanten',
        'icon': 'fa-user-plus'
    }, {
        'text': 'Klanten overzicht',
        'link': '/dashboard/klanten/overzicht',
        'icon': 'fa-users',
        'active': 'active'
    }]
});

angular.module('klantenoverzicht').directive('klantenoverzicht', function() {
    return {
        restrict: 'E',
        controllerAs: 'klantenoverzicht',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

                this.removeKlant = (klant) => {
                    Meteor.call('klanten.remove', klant);
                }

        }
    }
});
