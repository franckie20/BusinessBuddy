'use strict';

angular.module('taken', [
    'ui.router'
])

angular.module('taken').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('taken', {
        url: '/dashboard/taken',
        templateUrl: 'client/views/taken/taken.html',
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

angular.module('taken').controller('TakenMenuCtrl', function ($scope) {
    $scope.title = 'Taken toevoegen';
    $scope.link = "/dashboard/taken";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Nieuwe afspraak',
        'link': '/dashboard/afspraken',
        'icon': 'fa-plus-square-o'
    },
    {
        'text': 'Nieuwe taak',
        'link': '/dashboard/taken',
        'icon': 'fa-plus-square-o',
        'active': 'active'
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

angular.module('taken').filter('propsFilter', function() {
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

angular.module('taken').controller('TakenCtrl', ['$scope', function($scope) {
    $scope.user = {};
    $scope.urgent = {};

    $scope.taak = {
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
        Reminder: {
            datum: '',
            tijd: ''
        },
        Urgentie: {
            naam: '',
            kleur: '',
            niveau: ''
        }
    };

    $scope.success = '';
    $scope.error = '';

    $scope.nieuweTaak = (taak) => {
        if($scope.nieuweTaakForm.$valid) {
            $scope.taak.Uitvoerder._id = $scope.user.selected._id;
            $scope.taak.Uitvoerder.username = $scope.user.selected.username;
            $scope.taak.Uitvoerder.profile.name = $scope.user.selected.profile.name;
            $scope.taak.Reminder.datum = $scope.reminder.datum;
            $scope.taak.Reminder.tijd = $scope.reminder.tijd;
            $scope.taak.Urgentie.naam = $scope.urgent.selected.naam;
            $scope.taak.Urgentie.niveau = $scope.urgent.selected.niveau;
            $scope.taak.Urgentie.kleur = $scope.urgent.selected.kleur;

            var fromTE = $scope.taak.Einddatum.split("-");
            var toTE = new Date(fromTE[2], fromTE[1] - 1, fromTE[0]);
            $scope.taak.Einddatum = toTE;

            var fromRD = $scope.taak.Reminder.datum.split("-");
            var toRD = new Date(fromRD[2], fromRD[1] - 1, fromRD[0]);
            $scope.taak.Reminder.datum = toRD;

            Meteor.call('taken.insert', $scope.taak);
        }
    }
}]);