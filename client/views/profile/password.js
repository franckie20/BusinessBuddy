'use strict';

angular.module('password', [
  'ui.router'
])

angular.module('password').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider.state('password', {
      url: '/profile/password',
      template: '<password></password>'
  })
});

angular.module('password').directive('password', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/profile/password.html',
    controllerAs: 'password',
    controller: function ($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.credentials = {
        oldPassword: '',
        newPassword: ''
      };

      this.error = '';
      this.success = '';

      this.password = () => {
        Accounts.changePassword(this.credentials.oldPassword, this.credentials.newPassword, (err) => {
          if (err) {
            this.error = err;
          }
          else {
            this.success = "Password was successfully changed!";
          }
        });
      };
    }
  }
});
