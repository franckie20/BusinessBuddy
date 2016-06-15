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
});
