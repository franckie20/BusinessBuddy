'use strict';

angular.module('menu', [
  'ui.router'
]);

angular.module('menu').directive('menu', function() {
  return {
      restrict: 'E',
      templateUrl: 'client/views/menu/menu.html'
  }
});
