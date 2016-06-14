'use strict';

angular.module('menu', [
  'ui.router'
]);

angular.module('menu').directive('menu', function() {
  var contentUrl;
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      scope.getContentUrl = function() {
        return 'client/views/menu/' + attrs.name + '.html';
      }
    },
    template: '<div ng-include="getContentUrl()"</div>',
    scope: {
      title: '@',
      link: '@'
    }
  }
});
