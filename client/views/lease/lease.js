'use strict';

angular.module('lease', [
    'ui.router'
]);

angular.module('lease').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('lease', {
        url: '/dashboard/lease',
        templateUrl: 'client/views/lease/lease.html',
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

angular.module('lease').controller('LeaseMenuCtrl', function ($scope) {
    $scope.title = 'Lease toevoegen';
    $scope.link = "/dashboard/lease";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Nieuw leasecontract',
        'link': '/dashboard/lease',
        'icon': 'fa-newspaper-o',
        'active': 'active'
    }, {
        'text': 'Lease overzicht',
        'link': '/dashboard/lease/overzicht',
        'icon': 'fa-table'
    }]
});

angular.module('lease').controller('LeaseCtrl', ['$scope', '$filter', function($scope, $filter) {
  $scope.contract = {
    Bestuurder: {
      _id: '',
      username: '',
      profile: {
        name: ''
      }
    },
    Bedrijf: '',
    Startdatum: '',
    Einddatum:'',
    Opmerkingen: ''
  };

  $scope.error = '';
  $scope.success = '';

  $scope.nieuwContract = (contract) => {
    if($scope.nieuwContractForm.$valid) {
        $scope.contract.Bestuurder._id = $scope.contract.selected._id;
        $scope.contract.Bestuurder.username = $scope.contract.selected.username;
        $scope.contract.Bestuurder.profile.name = $scope.contract.selected.profile.name;

      if(Lease.find({"Bestuurder.username": $scope.contract.Bestuurder.username}, {Bedrijf: $scope.contract.Bedrijf}).count() == 1) {
          $scope.error = "Lease contract bestaat al!";
      } else {
        Meteor.call('lease.insert', $scope.contract);
        $scope.success = "Het lease contract voor " + $scope.contract.Bestuurder.profile.name + " is aangemaakt!";
      }
    }
  }

}]);
