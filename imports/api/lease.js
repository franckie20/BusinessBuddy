Lease = new Mongo.Collection('lease');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('lease', function() {
        return Lease.find();
    });
}

Meteor.methods({
    'lease.insert' (data) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Lease.insert({
            "Bestuurder": {
              "_id": data.Bestuurder._id,
              "username": data.Bestuurder.username,
              "profile": {
                "name": data.Bestuurder.profile.name
              }
            },
            'Bedrijf': data.Bedrijf,
            'Startdatum': data.Startdatum,
            'Einddatum': data.Einddatum,
            'Opmerkingen': data.Opmerkingen
        });
    },
    'Lease.remove' (lease) {
        Lease.remove({
            '_id': lease._id
        });
    }
});