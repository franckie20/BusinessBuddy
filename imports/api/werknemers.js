Werknemers = new Mongo.Collection('werknemers');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('werknemers', function() {
        return Werknemers.find();
    });
}

Meteor.methods({
    'werknemers.insert' (data) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Werknemers.insert({
            'Naam': data.Naam,
            'Email': data.Email,
            'Telefoon': data.Telefoon,
            'Bedrijf': data.Bedrijf,
            'Start': data.Start,
            'Eind': data.Eind
        });
    },

    'werknemers.remove' (werknemer) {
        Werknemers.remove({
            '_id': werknemer._id
        });
    },

    'werknemers.update' (details) {
        Werknemers.update({
            _id: details._id
        }, {
            $set: {
                'Naam': details.Naam,
                'Email': details.Email,
                'Telefoon': details.Telefoon,
                'Bedrijf': details.Bedrijf,
                'Start': details.Start,
                'Eind': details.Eind
            }
        });
    }
});