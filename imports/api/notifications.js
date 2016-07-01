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
    },
    'notifications.remove' (notification) {
        Notifications.remove({
            '_id': notification._id
        });
    }
});