Meteor.startup(() => {
    if (Werknemers.find().count() === 0) {
        const werknemers = [{
            'name': 'Henkie Palentijn',
            'email': 'henkje@email.com',
            'telephone': '064575415',
            'company': 'Aqualux Engineering',
            'start': '05-04-16',
            'end': '05-10-16'
        }, {
            'name': 'Sjonnie Flex',
            'email': 'sjonnieisflexibel@live.nl.',
            'telephone': '0645164578',
            'company': 'Dynavin 3D Studio',
            'start': '05-04-16',
            'end': '05-10-16'
        }, {
            'name': 'Patrick Flattrice',
            'email': 'patrickiscool@gmail.com',
            'telephone': '0645132548',
            'company': 'Flow design',
            'start': '05-04-16',
            'end': '05-10-16'
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
});
