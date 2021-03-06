'use strict';

angular.module('afspraken', [
    'ui.router',
    'ui.select',
    'ngSanitize'
]);

angular.module('afspraken').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('afspraken', {
        url: '/dashboard/afspraken',
        templateUrl: 'client/views/afspraken/afspraken.html',
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

angular.module('afspraken').filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function(item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    }
});

angular.module('afspraken').controller('AfsprakenMenuCtrl', function ($scope) {
    $scope.title = 'Afspraken toevoegen';
    $scope.link = "/dashboard/afspraken";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Nieuwe afspraak',
        'link': '/dashboard/afspraken',
        'icon': 'fa-plus-square-o',
        'active': 'active'
    },
    {
        'text': 'Nieuwe taak',
        'link': '/dashboard/taken',
        'icon': 'fa-plus-square-o'
    },
    {
        'text': 'Taken overzicht',
        'link': '/dashboard/taken/overzicht',
        'icon': 'fa-table'
    },
    {
        'text': 'Afspraken overzicht',
        'link': '/dashboard/afspraken/overzicht',
        'icon': 'fa-table'
    }]
});

angular.module('afspraken').controller('AfsprakenCtrl', ['$scope', '$filter', function($scope, $filter) {
    $scope.klant = {};
    $scope.user = {};
    
    $scope.afspraak = {
        Titel: '',
        Omschrijving: '',
        Einddatum: '',
        Eindtijd: '',
        Uitvoerder: {
            _id: '',
            username: '',
            profile: {
                name: ''
            }
        },
        Klant: {
            _id: '',
            Voornaam: '',
            Achternaam: '',
            Bedrijf: ''
        }
    };


    $scope.success = '';
    $scope.error = '';

    $scope.$watch('afspraak.Einddatum', function (newValue) {
        $scope.afspraak.Einddatum = $filter('date')(newValue, 'dd-MM-yyyy');
    });

    $scope.nieuweAfspraak = (afspraak) => {
        if($scope.nieuweAfspraakForm.$valid) {
            $scope.afspraak.Klant._id = $scope.klant.selected._id;
            $scope.afspraak.Klant.Voornaam = $scope.klant.selected.Voornaam;
            $scope.afspraak.Klant.Achternaam = $scope.klant.selected.Achternaam;
            $scope.afspraak.Klant.Bedrijf = $scope.klant.selected.Bedrijf;
            $scope.afspraak.Uitvoerder._id = $scope.user.selected._id;
            $scope.afspraak.Uitvoerder.username = $scope.user.selected.username;
            $scope.afspraak.Uitvoerder.profile.name = $scope.user.selected.profile.name;

            var from = $scope.afspraak.Einddatum.split("-");
            var f = new Date(from[2], from[1] - 1, from[0]);

            $scope.afspraak.Einddatum = f;

            if(Afspraken.find({Titel: $scope.afspraak.Titel}, {Omschrijving: $scope.afspraak.Omschrijving}).count() == 1) {
                $scope.error = "Afspraak bestaat al!";
            } else {
                $scope.success = "Afspraak " + $scope.afspraak.Titel + " aangemaakt!";
                Meteor.call('afspraken.insert', $scope.afspraak);
            }

        } else {
            $scope.error = "Controleer de velden";
        }
    }
}]);