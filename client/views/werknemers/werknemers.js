'use strict';

angular.module('werknemers', [
    'ui.router'
]);

angular.module('werknemers').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('werknemers', {
        url: '/dashboard/werknemers',
        templateUrl: 'client/views/werknemers/werknemers.html',
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

angular.module('werknemers').controller('WerknemersMenuCtrl', function ($scope) {
    $scope.title = 'Werknemers toevoegen';
    $scope.link = "/dashboard/werknemers";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Werknemers toevoegen',
        'link': '/dashboard/werknemers',
        'icon': 'fa-user-plus',
        'active': 'active'
    }, {
        'text': 'Werknemers overzicht',
        'link': '/dashboard/werknemers/overzicht',
        'icon': 'fa-users'
    }]
});

angular.module('werknemers').controller('WerknemersCtrl', ['$scope', '$filter', function($scope, $filter) {
    $scope.werknemer = {
        _id: '',
        Naam: '',
        Email: '',
        Telefoon: '',
        Bedrijf: '',
        Start: '',
        Eind: ''
    };

    $scope.success = '';
    $scope.error = '';

    $scope.$watch('werknemer.Start', function (newValue) {
        $scope.werknemer.Start = $filter('date')(newValue, 'dd-MM-yyyy');
    });

    $scope.nieuweWerknemer = (werknemer) => {
        if($scope.nieuweMedewerkerForm.$valid) {

            var fromWS = $scope.werknemer.Start.split("-");
            var toWS = new Date(fromWS[2], fromWS[1] - 1, fromWS[0]);
            $scope.werknemer.Start = toWS;

            if (Werknemers.find({Naam: $scope.werknemer.Naam}, {Email: $scope.werknemer.Email}).count() == 1) {
                $scope.error = "Werknemer bestaat al!";
            } else {
                $scope.success = "Werknemer " + $scope.werknemer.Naam + " aangemaakt!";
                Meteor.call('werknemers.insert', $scope.werknemer);
            }
        }  else {
            $scope.error = "Controleer de velden";
        }
    }
}]);