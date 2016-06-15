Meteor.startup(() => {
    if (Werknemers.find().count() === 0) {
        const werknemers = [{
            'name': 'Henkie Palentijn',
            'email': 'henkje@email.com',
            'telephone': '064575415',
            'company': 'Aqualux Engineering'
        }, {
            'name': 'Sjonnie Flex',
            'email': 'sjonnieisflexibel@live.nl.',
            'telephone': '0645164578',
            'company': 'Dynavin 3D Studio'
        }, {
            'name': 'Patrick Flattrice',
            'email': 'patrickiscool@gmail.com',
            'telephone': '0645132548',
            'company': 'Flow design'
        }];

        werknemers.forEach((werknemer) => {
            Werknemers.insert(werknemer)
        });
    }

    if (Klanten.find().count() === 0) {
        const klanten = [{
            'name': 'E-Flex Engineering BV',
            'email': 'info@eflex.com',
            'linkedin': 'E flex Engineering',
            'website': 'www.eflex.com',
            'telephone': '010451256',
            'location': '2401MX',
            'bio': 'Aqualux Engineering'
        }, {
            'name': 'AquaLux Design',
            'email': 'info@AquaLux.com',
            'linkedin': 'AquaLux Design',
            'website': 'www.AquaLux.com',
            'telephone': '03054572',
            'location': '4805KB',
            'bio': 'Aqualux Engineering'
        }, {
            'name': 'Terminal 3D',
            'email': 'info@Terminal3d.com',
            'linkedin': 'Terminal 3D Company',
            'website': 'www.terminal3D.com',
            'telephone': '020854562',
            'location': '2401MX',
            'bio': 'Wij specialiseren ons in het 3D printen van prototypes voor de werktuigbouwkundige sector'
        }];

        klanten.forEach((klant) => {
            Klanten.insert(klant)
        });
    }
});
