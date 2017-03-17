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
        if(Meteor.isServer) {
            if (Notifications.find({Titel: data.Titel}, {Omschrijving: data.Omschrijving}).count() == 0) {
                Notifications.insert({
                    'Type': data.Type,
                    'Titel': data.Titel,
                    'Omschrijving': data.Omschrijving,
                    'Einddatum': data.Einddatum,
                    'Eindtijd': data.Eindtijd,
                    'Uitvoerder': {
                      '_id': data.Uitvoerder._id,
                    }
                });
            }
        }
    },
    'notifications.remove' (notification) {
        Notifications.remove({
            '_id': notification._id
        });
    }
});