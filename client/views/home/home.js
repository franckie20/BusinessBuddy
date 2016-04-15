'use strict';

angular.module('home', [
  'ui.router'
])

angular.module('home').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'client/views/home/home.html',
  });
});
