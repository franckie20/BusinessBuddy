if (Meteor.isClient) {
  angular.module('businessbuddy', [
    'angular-meteor',
    'ui.router',
    'home',
    'menu',
    'dashboard',
    'category',
    'profile',
    'password',
    'sign_in',
    'register'
  ])

  angular.module('businessbuddy').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/home");
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
          }
        });
        this.logout = () => {
          Accounts.logout();
        };
      }
    }
  });
}
