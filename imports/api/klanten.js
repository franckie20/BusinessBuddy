Klanten = new Mongo.Collection('klanten');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('klanten', function() {
        return Klanten.find();
    });
}

Meteor.methods({
    'klanten.insertDutch' (data) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if(Klanten.find({Achternaam: data.Achternaam}, {Voornaam: data.Voornaam}, {Bedrijf: data.Bedrijf}).count() == 0) {
            if(data.Voornaam != null) {
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
        }
    },
    'klanten.insertEnglish' (data) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        if(Klanten.find({Achternaam: data['Last Name']}, {Voornaam: data['First Name']}, {Bedrijf: data.Company}).count() == 0) {
            if(data['First Name'] != null) {
                Klanten.insert({
                    'Account': data.Account,
                    'Achternaam': data['Last Name'],
                    'Achtervoegsel': data.Suffix,
                    'Afdeling': data.Department,
                    'Bedrijf': data.Company,
                    'Beroep': data.Profession,
                    'E-mailadres': data['E-mail Address'],
                    'Factuurinformatie': data['Billing information'],
                    'Fax op werk': data['Business fax'],
                    'Fax thuis': data['Home fax'],
                    'Functie': data['Job Title'],
                    'Geslacht': data.Gender,
                    'Huisadres, plaats': data['Home City'],
                    'Huisadres, postbusnummer': data['Home Address PO Box'],
                    'Huisadres, postcode': data['Home Postal Code'],
                    'Huisadres, provincie': data['Home State'],
                    'Locatie': data.Location,
                    'Mobiele telefoon': data['Mobile Phone'],
                    'Telefoon op werk': data['Business Phone'],
                    'Telefoon thuis': data['Home Phone'],
                    'Middelste naam': data['Middle Name'],
                    'Notities': data.Notes,
                    'Verjaardag': data.Anniversary,
                    'Voornaam': data['First Name'],
                    'Werkadres, plaats': data['Business City'],
                    'Werkadres, postcode': data['Business Postal Code'],
                    'Werkadres, provincie': data['Business State'],
                    'Werkadres, straat': data['Business Street']
                });
            }
        }
    },

    'klanten.remove' (klant) {
        Klanten.remove({
            '_id': klant._id
        });
    }
});