if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('users', function() {
        return Meteor.users.find({}, {fields:{profile: true, emails: true, username: true}});
    });
}