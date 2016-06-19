'use strict';

angular.module('dashboard', [
  'ui.router',
  'businessbuddy'
])

angular.module('dashboard').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    template: '<dashboard></dashboard>',
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

angular.module('dashboard').controller('DashboardMenuCtrl', function ($scope) {
  $scope.settings = true;
  $scope.title = 'Dashboard';
  $scope.link = "/dashboard";

  $scope.menuItems =  [{
    'text': 'Klanten',
    'link': '/dashboard/klanten',
    'icon': 'fa-users'
  }, {
    'text': 'Werknemers',
    'link': '/dashboard/werknemers',
    'icon': 'fa-briefcase'
  }, {
    'text': 'Afspraken & Taken',
    'link': '/dashboard/afspraken',
    'icon': 'fa-calendar'
  }, {
    'text': 'Lease Gegevens',
    'link': '/dashboard/lease',
    'icon': 'fa-car'
  }]
});

angular.module('dashboard').directive('dashboard', function() {

  return {
    scope: {
      fileread: "=",
      fileName: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        scope.$apply(function () {
          scope.fileread = changeEvent.target.files[0];
          var thefile = document.getElementById('fileName');
          scope.fileName = thefile.value;
          // or all selected files:
          // scope.fileread = changeEvent.target.files;
        });
      });
    },
    restrict: 'E',
    templateUrl: 'client/views/dashboard/dashboard.html',
    controllerAs: 'dashboard',
    controller: function ($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.success = '';
      this.error = '';

      this.uploadCSV = (file) =>
      {
        if($scope.fileread != null) {
          Papa.parse($scope.fileread, {
            header: true,
            complete: function (results) {
              for(var i=0; i < results.data.length; i++)
              {
                if(results.data[i] != null) {
                  if(results.data[i].Achternaam != null) {
                    Meteor.call('klanten.insertDutch', results.data[i]);
                  }
                  else if(results.data[i].Anniversary != null) {
                    Meteor.call('klanten.insertEnglish', results.data[i]);
                  }
                }
              }
              console.log("Data:", results.data);
            }
          });
          this.success = 'Al uw contacten zijn geïmporteerd';
        }
        else {
          this.error = 'Kies een bestand om te importeren!';
        }
      }
    }
  }
});
