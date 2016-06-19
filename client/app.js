if (Meteor.isClient) {
  angular.module('businessbuddy', [
    'angular-meteor',
    'ui.router',
    'ui.bootstrap',
    'menu',
    'dashboard',
    'category',
    'profile',
    'password',
    'sign_in',
    'register',
    'klanten',
    'klantenoverzicht',
    'klantDetails',
    'werknemers',
    'werknemersoverzicht',
    'afspraken',
    'afsprakenoverzicht',
    'lease',
    'leaseoverzicht'
  ]);

  angular.module('businessbuddy').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/dashboard");
  });

  angular.module('businessbuddy').directive('businessbuddy', function () {
    return {
      restrict: 'E',
      controllerAs: 'businessbuddy',
      controller: function ($scope, $reactive) {
        $reactive(this).attach($scope);

      
        this.subscribe('lease');
        this.subscribe('werknemers');
   
        this.subscribe('tasks');

        this.helpers({
          isLoggedIn: () => {
            return Meteor.userId() !== null;
          },
          currentUser: () => {
            return Meteor.user();
          },
          werknemers() {
            return Werknemers.find({}, {
              sort : this.getReactively('sort')
            });
          },
          klanten() {
            return Klanten.find({}, {
              sort : this.getReactively('sort')
            });
          },
          leasecontracts() {
          return Lease.find({}, {
            sort : this.getReactively('sort')
          });
          }
        });

        this.logout = () => {
          Accounts.logout();
        };
      }
    }
  });
}
