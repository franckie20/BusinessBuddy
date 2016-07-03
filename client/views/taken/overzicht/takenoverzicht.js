'use strict';

angular.module('takenoverzicht', [
    'ui.router'
]);

angular.module('takenoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('takenoverzicht', {
        url: '/dashboard/taken/overzicht',
        template: '<overzichttaak></overzichttaak>',
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

angular.module('takenoverzicht').controller('TakenOverzichtMenuCtrl', function ($scope) {
    $scope.title = 'Taken overzicht';
    $scope.link = "/dashboard/taken/overzicht";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [{
        'text': 'Nieuwe afspraak',
        'link': '/dashboard/afspraken',
        'icon': 'fa-plus-square-o'
    },
    {
        'text': 'Nieuwe taak',
        'link': '/dashboard/taken',
        'icon': 'fa-plus-square-o'
    },
    {
        'text': 'Taken overzicht',
        'link': '/dashboard/taken/overzicht',
        'icon': 'fa-table',
        'active': 'active'
    },
    {
        'text': 'Afspraken overzicht',
        'link': '/dashboard/afspraken/overzicht',
        'icon': 'fa-table'
    }]
});

angular.module('takenoverzicht').directive('overzichttaak', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/views/taken/overzicht/takenoverzicht.html',
        controllerAs: 'overzichttaak',
        controller: function ($scope, $reactive, $state, $filter) {
            $reactive(this).attach($scope);

            this.taak = '';
            this.perPage = 15;
            this.currentPage = 1;
            this.sort = {
                name: 1
            };

            this.subscribe('taken', () => [{
                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                sort: this.getReactively('sort')}
            ]);

            this.details = {
                _id: '',
                Titel: '',
                Omschrijving: '',
                Einddatum: '',
                Eindtijd: '',
                Uitvoerder: {
                    _id: '',
                    username: '',
                    profile: {
                        name: ''
                    }
                },
                Reminder: {
                    datum: '',
                    tijd: ''
                },
                Urgentie: {
                    naam: '',
                    kleur: '',
                    niveau: ''
                }
            };

            this.error = '';
            this.success = '';

            this.selectedTaak = (taak) => {
                this.taak = taak;
                this.details._id = this.taak._id;
                this.details.Titel = this.taak.Titel;
                this.details.Omschrijving = this.taak.Omschrijving;
                this.details.Einddatum = this.taak.Einddatum;
                this.details.Einddatum = $filter('date')(this.taak.Einddatum, 'dd-MM-yyyy');
                this.details.Eindtijd = this.taak.Eindtijd;
                this.details.Uitvoerder._id = this.taak.Uitvoerder._id;
                this.details.Uitvoerder.username = this.taak.Uitvoerder.username;
                this.details.Uitvoerder.profile.name = this.taak.Uitvoerder.profile.name;
                this.details.Reminder.datum = this.taak.Reminder.datum;
                this.details.Reminder.datum = $filter('date')(this.taak.Reminder.datum, 'dd-MM-yyyy');
                this.details.Reminder.tijd = this.taak.Reminder.tijd;
                this.details.Urgentie.naam = this.taak.Urgentie.naam;
                this.details.Urgentie.niveau = this.taak.Urgentie.niveau;
                this.details.Urgentie.kleur = this.taak.Urgentie.kleur;
            }

            this.updateTaak = () => {
                var from = this.details.Einddatum.split("-");
                var f = new Date(from[2], from[1] - 1, from[0]);
                this.details.Einddatum = f;

                var fromReminder = this.details.Reminder.datum.split("-");
                var fReminder = new Date(fromReminder[2], fromReminder[1] - 1, fromReminder[0]);
                this.details.Reminder.datum = fReminder;

                this.success = "Taak gewijzigd!";
                Meteor.call('taken.update', this.details);
            }

            this.removeTaak = () =>  {
                Meteor.call('taken.remove', this.taak);
            }

        }
    }
});

