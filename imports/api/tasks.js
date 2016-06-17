TasksCollection = new Mongo.Collection("tasks");

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('tasks', function() {
        return TasksCollection.find();
    });
}