'use strict';

angular.module('dashboard', [
  'ui.router',
  'businessbuddy'
])

angular.module('dashboard').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'client/views/dashboard/dashboard.html',
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
