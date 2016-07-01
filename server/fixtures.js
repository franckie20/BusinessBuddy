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
            'name': 'Jos Verstappen',
            'company': 'BlueRent',
            'start': '08-04-16',
            'end': '08-08-16',
            'comments': 'Let op, beetje snel aangebrand'
        }, {
            'name': 'Max Verstappen',
            'company': 'WhiteRent',
            'start': '08-04-16',
            'end': '08-08-16',
            'comments': 'Goed oppassen, bakt er niks van'
        }, {
            'name': 'Kimi Raikonen',
            'company': 'RedRent',
            'start': '08-04-16',
            'end': '08-08-16',
            'comments': 'Woon-werk verkeer'
        }];

        leasefixtures.forEach((lease) => {
            Lease.insert(lease)
    });
    }


    if (Notifications.find().count() === 0) {
        const notificationFixtures = [{
            'type': 'afspraak',
            'content': 'BlueRent',
            'eind': '02-07-2016',
            'contact': 'Henkie Mcskou'
        }, {
            'type': 'taak',
            'content': 'Herinnering voor uw taak',
            'eind': '04-07-2016',
            'contact': 'Boris vd Swag',
        }, {
            'type': 'lease',
            'content': 'Contract loopt af',
            'eind': '08-08-2016',
            'contact': 'BlueRent',
        }];

        notificationFixtures.forEach((notification) => {
            Notifications.insert(notification)
    });
    }
});
