Taken = new Mongo.Collection('taken');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('taken', function() {
        return Taken.find();
    });
}

Meteor.methods({
    'taken.insert' (data) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Taken.insert({
        });
    },
    'taken.remove' (taak) {
        Taken.remove({
            '_id': taak._id
        });
    }
});