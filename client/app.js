if (Meteor.isClient) {
  angular.module('businessbuddy', [
    'angular-meteor',
    'ui.router',
    'ui.bootstrap',
    'menu',
    'dashboard',
    'category',
    'profile',
    'password',
    'sign_in',
    'register',
    'klanten',
    'klantenoverzicht',
    'werknemers',
    'werknemersoverzicht',
    'afspraken',
    'lease',
    'leaseoverzicht'
  ]);

  angular.module('businessbuddy').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/dashboard");
  });

  angular.module('businessbuddy').directive('businessbuddy', function () {
    return {
      restrict: 'E',
      controllerAs: 'businessbuddy',
      controller: function ($scope, $reactive) {
        $reactive(this).attach($scope);

        this.helpers({
          isLoggedIn: () => {
            return Meteor.userId() !== null;
          },
          currentUser: () => {
            return Meteor.user();
          },
          werknemers() {
            return Werknemers.find({});
          },
          klanten() {
            return Klanten.find({});
          }
        });

        this.logout = () => {
          Accounts.logout();
        };


      }
    }
  });

  angular.module('businessbuddy').controller('WerknemersOverzichtController', function ($scope) {
    $scope.filteredTodos = []
        ,$scope.currentPage = 1
        ,$scope.numPerPage = 10
        ,$scope.maxSize = 5;

    $scope.makeTodos = function() {
      $scope.todos = [];
      for (i=1;i<=1000;i++) {
        $scope.todos.push({ text:'todo '+i, done:false});
      }
    };
    $scope.makeTodos();

    $scope.$watch('currentPage + numPerPage', function() {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage)
          , end = begin + $scope.numPerPage;

      $scope.filteredTodos = $scope.todos.slice(begin, end);
    });
  });

}
