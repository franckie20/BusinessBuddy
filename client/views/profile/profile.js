'use strict';

angular.module('profile', [
  'ui.router'
])

angular.module('profile').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider.state('profile', {
    url: '/profile',
    templateUrl: 'client/views/profile/profile.html',
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
