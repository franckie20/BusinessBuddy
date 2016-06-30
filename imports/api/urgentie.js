Urgentie = new Mongo.Collection('urgentie');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('urgentie', function() {
        return Urgentie.find();
    });
}