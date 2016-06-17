'use strict';

angular.module('sign_in', [
  'ui.router',
  'businessbuddy'
]);

angular.module('sign_in').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider.state('sign_in', {
        url: '/users/sign_in',
        template: '<login></login>'
  })
});

angular.module("sign_in").directive('login', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/users/sign_in.html',
    controllerAs: 'login',
    controller: function ($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.credentials = {
        username: '',
        password: ''
      };

      this.error = '';

      this.login = () => {
        Meteor.loginWithPassword(this.credentials.username, this.credentials.password, (err) => {
          if (err) {
            this.error = err;
          }
          else {
            $state.go('dashboard');
          }
        });
      };
    }
  }
});
