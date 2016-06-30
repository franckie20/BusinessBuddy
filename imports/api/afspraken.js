Afspraken = new Mongo.Collection('afspraken');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('afspraken', function() {
        return Afspraken.find();
    });
}

Meteor.methods({
    'afspraken.insert' (data) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if(Afspraken.find({Titel: data.Titel}, {Omschrijving: data.Omschrijving}).count() == 0) {
            Afspraken.insert({
                Titel: data.Titel,
                Omschrijving: data.Omschrijving,
                Einddatum: data.Einddatum,
                Eindtijd: data.Eindtijd,
                Uitvoerder: {
                    _id: data.Uitvoerder._id,
                    username: data.Uitvoerder.username
                },
                Klant: {
                    _id: data.Klant._id,
                    Voornaam: data.Klant.Voornaam,
                    Achternaam: data.Klant.Achternaam,
                    Bedrijf: data.Klant.Bedrijf
                }
            });
        }
    },
    'afspraken.remove' (afspraak) {
        Afspraken.remove({
            '_id': afspraak._id
        });
    }
});