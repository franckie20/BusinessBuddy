if (Meteor.isClient) {
  angular.module('businessbuddy', [
    'angular-meteor',
    'ui.router',
    'menu',
    'dashboard',
    'category',
    'profile',
    'password',
    'sign_in',
    'register',
    'klanten',
    'klantenoverzicht',
    'werknemers',
    'werknemersoverzicht',
    'afspraken',
    'lease'
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

        this.helpers({
          isLoggedIn: () => {
            return Meteor.userId() !== null;
          },
          currentUser: () => {
            return Meteor.user();
          },
          parties () {
            //return Parties.find({});
          }
        });

        this.logout = () => {
          Accounts.logout();
        };
      }
    }
  });
}
