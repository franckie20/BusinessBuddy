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

angular.module('afspraken').controller('AfsprakenCtrl', ['$scope', function($scope) {
    $scope.klant = {};
    $scope.user = {};
    
    $scope.details = {
        Titel: '',
        Omschrijving: '',
        Einddatum: '',
        Eindtijd: '',
        Uitvoerder: '',
        Klant: ''
    };

    $scope.nieuweAfspraak = () => {
        $scope.details.Klant = $scope.klant.selected;
        $scope.details.Uitvoerder = $scope.user.selected;
        console.log($scope.details);
    }
}]);