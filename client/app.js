if (Meteor.isClient) {
  angular.module('businessbuddy', [
    'angular-meteor',
    'ui.router',
    'ui.bootstrap',
    'menu',
    'dashboard',
    'taken',
    'profile',
    'password',
    'sign_in',
    'register',
    'klantenoverzicht',
    'takenoverzicht',
    'notificationsLease',
    'notificationsAfspraak',
    'notificationsTaak',
    'werknemers',
    'werknemersoverzicht',
    'afspraken',
    'afsprakenoverzicht',
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
      controller: function ($scope, $reactive, $location) {
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
            return Taken.find({"Uitvoerder._id": Meteor.userId()}, {
              sort : this.getReactively('sort')
            });
          },
          afspraken() {
            return Afspraken.find({"Uitvoerder._id": Meteor.userId()}, {
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
          totalTakenNotifications() {
            return Notifications.find({'Type': "taak"}).count();
          },
          totalAfsprakenNotifications() {
            return Notifications.find({'Type': "afspraak"}).count();
          },
          totalLeaseAfsprakenNotifications() {
            return Notifications.find({'Type': "lease"}).count();
          },
          totalNotifications() {
            var taken = Notifications.find({'Type': "taak"}).count();
            var afspraken = Notifications.find({'Type': "afspraak"}).count();
            var lease = Notifications.find({'Type': "lease"}).count();
            return taken + afspraken + lease;
          },
          urgentie() {
            return Urgentie.find({});
          }
        });

        this.sortBy = function(propertyName) {
          this.reverse = (this.propertyName === propertyName) ? !this.reverse : false;
          this.propertyName = propertyName;
        };

        this.logout = () => {
          Accounts.logout();
        };
      }
    }
  });
}
