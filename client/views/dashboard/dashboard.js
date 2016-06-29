'use strict';

angular.module('dashboard', [
  'ui.router',
  'businessbuddy'
])

angular.module('dashboard').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    template: '<dashboard></dashboard>',
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

angular.module('dashboard').controller('DashboardMenuCtrl', function ($scope) {
  $scope.settings = true;
  $scope.title = 'Dashboard';
  $scope.link = "/dashboard";

  $scope.menuItems =  [{
    'text': 'Klanten',
    'link': '/dashboard/klanten',
    'icon': 'fa-users'
  }, {
    'text': 'Werknemers',
    'link': '/dashboard/werknemers',
    'icon': 'fa-briefcase'
  }, {
    'text': 'Afspraken & Taken',
    'link': '/dashboard/afspraken',
    'icon': 'fa-calendar'
  }, {
    'text': 'Lease Gegevens',
    'link': '/dashboard/lease',
    'icon': 'fa-car'
  }]
});

angular.module('dashboard').directive('dashboard', function() {
  return {
    scope: {
      fileread: "=",
      fileName: "="
    },
    link: function (scope, element, attributes) {
      element.bind("change", function (changeEvent) {
        scope.$apply(function () {
          scope.fileread = changeEvent.target.files[0];
          var thefile = document.getElementById('fileName');
          scope.fileName = thefile.value;
          // or all selected files:
          // scope.fileread = changeEvent.target.files;
        });
      });
    },
    restrict: 'E',
    templateUrl: 'client/views/dashboard/dashboard.html',
    controllerAs: 'dashboard',
    controller: function ($scope, $reactive, $state) {
      $reactive(this).attach($scope);

      this.success = '';
      this.error = '';
      this.loading = '';

      // Het uploaded van de CSV
      this.uploadCSV = (file) =>
      {
        if($scope.fileread != null) {
          // Kijken of de file extensie een CSV is of niet
          if($scope.fileName.substr($scope.fileName.lastIndexOf('.')+1) == 'CSV') {
            this.loading = true;
            Papa.parse($scope.fileread, {
              header: true,
              complete: function (results) {
                for (var i = 0; i < results.data.length; i++) {
                  if (results.data[i] != null) {
                    // Is de header in het Nederlands?
                    if (results.data[i].Achternaam != null) {
                      Meteor.call('klanten.insertDutch', results.data[i]);
                    }
                    // Of is de header in het Engels?
                    else if (results.data[i].Anniversary != null) {
                      Meteor.call('klanten.insertEnglish', results.data[i]);
                    }
                  }
                }
                this.loading = false;
                this.success = "Al uw contacten zijn geïmporteerd";
                console.log(this.loading);
              }
            });
          } else {
            this.error = 'Kies een correct bestand om te importeren!';
          }
        }
        else {
          this.error = 'Kies een bestand om te importeren!';
        }
      }
    }
  }
  // Your Client ID can be retrieved from your project in the Google
  // Developer Console, https://console.developers.google.com
  var CLIENT_ID = '716612570431-g5f2afa579te88t49t99bef4u89k6jat.apps.googleusercontent.com';

  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

  /**
   * Check if current user has authorized this application.
   */
  function checkAuth() {
    gapi.auth.authorize(
        {
          'client_id': CLIENT_ID,
          'scope': SCOPES.join(' '),
          'immediate': true
        }, handleAuthResult);
  }

  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      loadCalendarApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  }

  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Event} event Button click event.
   */
  function handleAuthClick(event) {
    gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
    return false;
  }

  /**
   * Load Google Calendar client library. List upcoming events
   * once client library is loaded.
   */
  function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
  }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) {
      var events = resp.items;
      appendPre('Upcoming events:');

      if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          appendPre(event.summary + ' (' + when + ')')
        }
      } else {
        appendPre('No upcoming events found.');
      }

    });
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }
});
