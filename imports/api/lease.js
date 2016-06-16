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
            'name': data.name,
            'company': data.company,
            'start': data.start,
            'end': data.end,
            'comments': data.comments
        });
    }
});