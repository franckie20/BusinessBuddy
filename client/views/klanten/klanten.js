'use strict';

angular.module('klantenoverzicht', [
    'ui.router',
    'angularUtils.directives.dirPagination'
]);

angular.module('klantenoverzicht').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $stateProvider.state('klantenoverzicht', {
        url: '/dashboard/klanten',
        template: '<overzichtklant></overzichtklant>',
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

angular.module('klantenoverzicht').controller('KlantenOverzichtMenuCtrl', function ($scope) {
    $scope.title = 'Klanten overzicht';
    $scope.link = "/dashboard/klanten";
    $scope.showGoToDashboard = true;

    $scope.menuItems =  [
      {
        'text': 'Klanten overzicht',
        'link': '/dashboard/klanten',
        'icon': 'fa-users',
        'active': 'active'
    }]
});

angular.module('klantenoverzicht').directive('overzichtklant', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/views/klanten/klantenoverzicht.html',
        controllerAs: 'overzichtklant',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.klant = '';
            this.perPage = 15;
            this.currentPage = 1;
            this.sort = {
                name: 1
            };

            this.subscribe('klanten', () => [{
                limit: parseInt(this.perPage),
                skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                sort: this.getReactively('sort')}
            ]);

            this.details = {
                _id: '',
                Voornaam: '',
                Achternaam: '',
                Email: '',
                Bedrijf: '',
                Afdeling: '',
                Notities: '',
                HPlaats: '',
                HPostbusnummer: '',
                HPostcode: '',
                HProvincie: '',
                Locatie: '',
                Mobtel: '',
                Telwerk: '',
                Telthuis: ''
            };

            this.selectedKlant = (klant) => {
                this.klant = klant;
                this.details._id = this.klant._id;
                this.details.Voornaam = this.klant.Voornaam;
                this.details.Achternaam = this.klant.Achternaam;
                this.details.Email = this.klant['E-mailadres'];
                this.details.Bedrijf = this.klant.Bedrijf;
                this.details.Afdeling = this.klant.Afdeling;
                this.details.Notities = this.klant.Notities;
                this.details.HPlaats = this.klant['Huisadres, plaats'];
                this.details.HPostbusnummer = this.klant['Huisadres, postbusnummer'];
                this.details.HPostcode = this.klant['Huisadres, postcode'];
                this.details.HProvincie = this.klant['Huisadres, provincie'];
                this.details.Locatie = this.klant.Locatie;
                this.details.Mobtel = this.klant['Mobiele telefoon'];
                this.details.Telwerk = this.klant['Telefoon op werk'];
                this.details.Telthuis = this.klant['Telefoon thuis'];
            }

            this.updateKlant = () => {
                Meteor.call('klanten.update', this.details);
                this.success = "Wijzigingen bij " + this.klant.Voornaam + " " + this.klant.Achternaam + " doorgevoerd!";
            }

            this.removeKlant = () =>  {
                Meteor.call('klanten.remove', this.klant);
            }

        }
    }
});
