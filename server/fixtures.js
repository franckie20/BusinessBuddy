Meteor.startup(() => {
    if (Werknemers.find().count() === 0) {
        var datum = new Date();
        datum.setHours(20,59,59);

        const werknemers = [{
            'Naam': 'Henkie Palentijn',
            'Email': 'henkje@email.com',
            'Telefoon': '064575415',
            'Bedrijf': 'Aqualux Engineering',
            'Start': datum,
            'Eind': ''
        }, {
            'Naam': 'Sjonnie Flex',
            'Email': 'sjonnieisflexibel@live.nl.',
            'Telefoon': '0645164578',
            'Bedrijf': 'Dynavin 3D Studio',
            'Start': datum,
            'Eind': ''
        }, {
            'Naam': 'Patrick Flattrice',
            'Email': 'patrickiscool@gmail.com',
            'Telefoon': '0645132548',
            'Bedrijf': 'Flow design',
            'Start': datum,
            'End': ''
        }];

        werknemers.forEach((werknemer) => {
            Werknemers.insert(werknemer)
        });
    }

    if (Klanten.find().count() === 0) {
        const klanten = [{
            'Voornaam': 'Piet',
            'Achternaam': 'Holland',
            'E-mailadres': 'pietholland@casema.nl',
            'Telefoon op werk': '010-154872',
            'Mobiele telefoon': '06-45132648',
            'Werkadres, plaats': 'Eindhoven'
        }, {
            'Voornaam': 'Sjaak',
            'Achternaam': 'de Groot',
            'E-mailadres': 'sjaakdegroot@live.nl',
            'Telefoon op werk': '020-4571895',
            'Mobiele telefoon': '06-78451954',
            'Werkadres, plaats': 'Breda'
        }, {
            'Voornaam': 'Cees',
            'Achternaam': 'Zwart',
            'E-mailadres': 'ceeszwart@hotmail.com',
            'Telefoon op werk': '020-4598526',
            'Mobiele telefoon': '06-123456',
            'Werkadres, plaats': 'Amsterdam'
        }];

        klanten.forEach((klant) => {
            Klanten.insert(klant)
        });
    }

    if (Lease.find().count() === 0) {
        const leasefixtures = [{
            'Bestuurder': {
              'profile': {
                'username': 'Jos Verstappen'
              }
            },
            'Bedrijf': 'BlueRent',
            'Startdatum': '08-04-16',
            'Einddatum': '08-08-16',
            'Opmerkingen': 'Let op, beetje snel aangebrand'
        }, {
            'Bestuurder': {
              'profile': {
                'username': 'Max Verstappen'
              }
            },
            'Bedrijf': 'WhiteRent',
            'Startdatum': '08-04-16',
            'Einddatum': '08-08-16',
            'Opmerkingen': 'Goed oppassen, bakt er niks van'
        }, {
            'Bestuurder': {
              'profile': {
                'username': 'Kimi Raikonen'
              }
            },
            'Bedrijf': 'RedRent',
            'Startdatum': '08-04-16',
            'Einddatum': '08-08-16',
            'Opmerkingen': 'Woon-werk verkeer'
        }];

        leasefixtures.forEach((lease) => {
            Lease.insert(lease)
    });
    }


    if (Notifications.find().count() === 0) {
        const notificationFixtures = [{
            'Type': 'afspraak',
            'Titel': 'BlueRent',
            'Omschrijving': 'BlueRent',
            'Einddatum': '02-07-2016',
            'Eindtijd': '',
            'Uitvoerder': {
              'username': 'franckie20',
              'profile': {
                'name': 'Franck Verschuur'
              }
            }
        }];

        notificationFixtures.forEach((notification) => {
            Notifications.insert(notification)
    });
    }
});
