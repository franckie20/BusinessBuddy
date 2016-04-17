'use strict';

angular.module('category', [
  'ui.router',
  'businessbuddy'
])

angular.module('category').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider.state('category_new', {
    url: '/category/new',
    templateUrl: 'client/views/category/category_new.html',
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
