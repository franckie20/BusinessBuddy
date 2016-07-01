Notifications = new Mongo.Collection('notifications');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('notifications', function() {
        return Notifications.find();
    });
}

Meteor.methods({
    'notifications.insert' (data) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if(Notifications.find({Titel: data.Titel}, {Omschrijving: data.Omschrijving}).count() == 0) {
            Notifications.insert({
                Titel: data.Titel,
                Omschrijving: data.Omschrijving,
                Einddatum: data.Einddatum,
                Eindtijd: data.Eindtijd,
                Uitvoerder: {
                    _id: data.Uitvoerder._id,
                    username: data.Uitvoerder.username,
                    profile: {
                        name: data.Uitvoerder.profile.name
                    }
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
    'notifications.remove' (notification) {
        Notifications.remove({
            '_id': notification._id
        });
    }
});