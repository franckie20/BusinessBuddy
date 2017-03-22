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
    'lease.remove' (lease) {
        Lease.remove({
            '_id': lease._id
        });
    },

    'lease.update' (details) {
        Lease.update({
            _id: details._id
        }, {
            $set: {
                'Bestuurder': {
                    "_id": details.Bestuurder._id,
                    "username": details.Bestuurder.username,
                    "profile": {
                        "name": details.Bestuurder.profile.name
                    }
                },
                'Bedrijf': details.Bedrijf,
                'Startdatum': details.Startdatum,
                'Einddatum': details.Einddatum,
                'Opmerkingen': details.Opmerkingen
            }
        });
    }
});