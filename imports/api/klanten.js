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

        if(Klanten.find({Achternaam: data.Achternaam}, {Voornaam: data.Voornaam}, {Bedrijf: data.Bedrijf}).count() == 0) {
            Klanten.insert({
                'Account': data.Account,
                'Achternaam': data.Achternaam,
                'Achtervoegsel': data.Achtervoegsel,
                'Afdeling': data.Afdeling,
                'Bedrijf': data.Bedrijf,
                'Beroep': data.Beroep,
                'E-mailadres': data['E-mailadres'],
                'Factuurinformatie': data.Factuurinformatie,
                'Fax op werk': data['Fax op werk'],
                'Fax thuis': data['Fax thuis'],
                'Functie': data.Functie,
                'Geslacht': data.Geslacht,
                'Huisadres, plaats': data['Huisadres, plaats'],
                'Huisadres, postbusnummer': data['Huisadres, postbusnummer'],
                'Huisadres, postcode': data['Huisadres, postcode'],
                'Huisadres, provincie': data['Huisadres, provincie'],
                'Locatie': data.Locatie,
                'Mobiele telefoon': data['Mobiele telefoon'],
                'Telefoon op werk': data['Telefoon op werk'],
                'Telefoon thuis': data['Telefoon thuis'],
                'Middelste naam': data['Middelste naam'],
                'Notities': data.Notities,
                'Verjaardag': data.Verjaardag,
                'Voornaam': data.Voornaam,
                'Werkadres, plaats': data['Werkadres, plaats'],
                'Werkadres, postcode': data['Werkadres, postcode'],
                'Werkadres, provincie': data['Werkadres, provincie'],
                'Werkadres, straat': data['Werkadres, straat']
            });
        }
    },

    'klanten.remove' (klant) {
        Klanten.remove({
            '_id': klant._id
        });
    }
});