Klanten = new Mongo.Collection('klanten');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('klanten', function() {
        return Klanten.find();
    });
}

Meteor.methods({
    'klanten.insert' (data) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Klanten.insert({
            'name': data.name,
            'email': data.email,
            'linkedin': data.linkedin,
            'website': data.website,
            'telephone': data.telephone,
            'location': data.location,
            'bio': data.bio
        });
    },


    'klanten.remove' (klant) {
        Klanten.remove({
            '_id': klant._id
        });
    }
});