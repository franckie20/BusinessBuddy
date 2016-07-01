if (Meteor.isClient) {
  angular.module('businessbuddy', [
    'angular-meteor',
    'ui.router',
    'ui.bootstrap',
    'menu',
    'dashboard',
    'taken',
    'category',
    'profile',
    'password',
    'sign_in',
    'register',
    'klanten',
    'klantenoverzicht',
    'takenoverzicht',
    'werknemers',
    'werknemersoverzicht',
    'afspraken',
    'afsprakenoverzicht',
    'lease',
    'leaseoverzicht',
    'notifications'

  ]);

  angular.module('businessbuddy').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/dashboard");
  });

  angular.module('businessbuddy').directive('businessbuddy', function () {
    return {
      restrict: 'E',
      controllerAs: 'businessbuddy',
      controller: function ($scope, $reactive, $rootScope) {
        $reactive(this).attach($scope);

        this.subscribe('lease');
        this.subscribe('werknemers');
        this.subscribe('klanten');
        this.subscribe('taken');
        this.subscribe('afspraken');
        this.subscribe('users');
        this.subscribe('urgentie');
        this.subscribe('notifications');

        this.helpers({
          isLoggedIn: () => {
            return Meteor.userId() !== null;
          },
          currentUser: () => {
            return Meteor.user();
          },
          werknemers() {
            return Werknemers.find({}, {
              sort : this.getReactively('sort')
            });
          },
          klanten() {
            return Klanten.find({}, {
              sort : this.getReactively('sort')
            });
          },
          taken() {
            return Taken.find({}, {
              sort : this.getReactively('sort')
            });
          },
          afspraken() {
            return Afspraken.find({}, {
              sort : this.getReactively('sort')
            });
          },
          leasecontracts() {
            return Lease.find({}, {
              sort : this.getReactively('sort')
            });
          },
          users() {
            return Meteor.users.find({});
          },
          notifications() {
            return Notifications.find({});
          },
          urgentie() {
            return Urgentie.find({});
          }
        });

        this.logout = () => {
          Accounts.logout();
        };

        this.notifications = () => {
          // ga naar notifications
        };
      }
    }
  });
}
