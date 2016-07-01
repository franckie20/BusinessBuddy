'use strict';

angular.module('afsprakenoverzicht', [
    'ui.router'
]);

angular.module('afsprakenoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('afsprakenoverzicht', {
        url: '/dashboard/afspraken/overzicht',
        template: '<overzichtafspraak></overzichtafspraak>',
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

angular.module('afsprakenoverzicht').controller('AfsprakenOverzichtMenuCtrl', function ($scope) {
    $scope.title = 'Afspraken overzicht';
    $scope.link = "/dashboard/afspraken/overzicht";
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
        'icon': 'fa-table'
    },
    {
        'text': 'Afspraken overzicht',
        'link': '/dashboard/afspraken/overzicht',
        'icon': 'fa-table',
        'active': 'active'
    }]
});

angular.module('afsprakenoverzicht').directive('overzichtafspraak', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/views/afspraken/overzicht/afsprakenoverzicht.html',
        controllerAs: 'overzichtafspraak',
        controller: function ($scope, $reactive, $state, $filter) {
            $reactive(this).attach($scope);

            this.afspraak = '';
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
                Klant: {
                    _id: '',
                    Voornaam: '',
                    Achternaam: '',
                    Bedrijf: ''
                }
            };

            this.selectedAfspraak = (afspraak) => {
                this.afspraak = afspraak;
                this.details._id = this.afspraak._id;
                this.details.Titel = this.afspraak.Titel;
                this.details.Omschrijving = this.afspraak.Omschrijving;
                this.details.Einddatum = this.afspraak.Einddatum;
                this.details.Einddatum = $filter('date')(this.afspraak.Einddatum, 'dd-MM-yyyy');
                this.details.Eindtijd = this.afspraak.Eindtijd;
                this.details.Klant._id = this.afspraak.Klant._id;
                this.details.Klant.Voornaam = this.afspraak.Klant.Voornaam;
                this.details.Klant.Achternaam = this.afspraak.Klant.Achternaam;
                this.details.Klant.Bedrijf = this.afspraak.Klant.Bedrijf;
                this.details.Uitvoerder._id = this.afspraak.Uitvoerder._id;
                this.details.Uitvoerder.profile.name = this.afspraak.Uitvoerder.profile.name;
                this.details.Uitvoerder.username = this.afspraak.Uitvoerder.username;
            }

            this.updateAfspraak = () => {
                var from = this.details.Einddatum.split("-");
                var f = new Date(from[2], from[1] - 1, from[0]);
                this.details.Einddatum = f;

                Meteor.call('afspraken.update', this.details);
            }

            this.removeAfspraak = () =>  {
                Meteor.call('afspraken.remove', this.afspraak);
            }

        }
    }
});

