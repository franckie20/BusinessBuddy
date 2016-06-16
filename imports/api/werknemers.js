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
            'name': data.name,
            'email': data.email,
            'telephone': data.telephone,
            'company': data.company
        });
    }
});