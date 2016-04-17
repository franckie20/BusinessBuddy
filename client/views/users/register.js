'use strict';

angular.module('register', [
  'ui.router'
])

angular.module('register').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider.state('register', {
        url: '/users/register'
  })
});

angular.module('register').directive('register', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/users/register.html',
    controllerAs: 'register',
    controller: function ($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.credentials = {
        username: '',
        email: '',
        password: '',
        profile: {
          name: 'Franck V'
        }
      };

      this.error = '';
      this.success = '';

      this.register = () => {
        Accounts.createUser(this.credentials, (err) => {
          if (err) {
            this.error = err;
          }
          else {
            this.success = "Successfully registered " + this.credentials.username;
            $state.go('sign_in');
          }
        });
        // Accounts.sendVerificationEmail(this.userId, [this.credentials.email])
      };
    }
  }
});
