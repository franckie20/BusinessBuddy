'use strict';

angular.module('profile', [
  'ui.router'
])

angular.module('profile').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider.state('profile', {
    url: '/profile',
    template: '<profile></profile>',
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
})

angular.module('profile').directive('profile', function() {
  return {
    restrict: 'E',
    templateUrl: 'client/views/profile/profile.html',
    controllerAs: 'profile',
    controller: function ($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.credentials = {
        profile: {
          skype: '',
          linkedin: ''
        }
      };

      this.error = '';
      this.success = '';

      this.profile = () => {
        users.update(this._id, { profile: { skype: skype }, });
        // Accounts.sendVerificationEmail(this.userId, [this.credentials.email])
      };
    }
  }
});
