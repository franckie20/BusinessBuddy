werknemersCollection = new Mongo.Collection('werknemers');
Parties = new Mongo.Collection('parties');


console.log('hij is running');
/*
Meteor.startup(() => {
    if (werknemersCollection.find().count() === 0) {
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
        werknemersCollection.insert(werknemer)
    });
    }
});
*/
Meteor.startup(() => {
    if (Parties.find().count() === 0) {
    const parties = [{
        'name': 'Dubstep-Free Zone',
        'description': 'Fast just got faster with Nexus S.'
    }, {
        'name': 'All dubstep all the time',
        'description': 'Get it on!'
    }, {
        'name': 'Savage lounging',
        'description': 'Leisure suit required. And only fiercest manners.'
    }];

    parties.forEach((party) => {
        Parties.insert(party)
});
}
});
