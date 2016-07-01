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

        if(Taken.find({Titel: data.Titel}, {Omschrijving: data.Omschrijving}).count() == 0) {
            Taken.insert({
                Titel: data.Titel,
                Omschrijving: data.Omschrijving,
                Einddatum: data.Einddatum,
                Eindtijd: data.Eindtijd,
                Uitvoerder: {
                    _id: data.Uitvoerder._id,
                    username: data.Uitvoerder.username,
                    profile: {
                        name: data.Uitvoerder.profile.name
                    }
                },
                Reminder: {
                    datum: data.Reminder.datum,
                    tijd: data.Reminder.tijd
                },
                Urgentie: {
                    naam: data.Urgentie.naam,
                    kleur: data.Urgentie.kleur,
                    niveau: data.Urgentie.niveau
                }
            });
        }
    },
    'taken.remove' (taak) {
        Taken.remove({
            '_id': taak._id
        });
    },

    'taken.update' (details) {
        Taken.update({
            _id: details._id
        }, {
            $set: {
                'Titel': details.Titel,
                'Omschrijving': details.Omschrijving,
                'Einddatum': details.Einddatum,
                'Eindtijd': details.Eindtijd,
                'Uitvoerder': {
                    '_id': details.Uitvoerder._id,
                    'username': details.Uitvoerder.username,
                    'profile': {
                        'name': details.Uitvoerder.profile.name
                    }
                },
                'Reminder': {
                    'datum': details.Reminder.datum,
                    'tijd': details.Reminder.tijd
                },
                'Urgentie': {
                    'naam': details.Urgentie.naam,
                    'kleur': details.Urgentie.kleur,
                    'niveau': details.Urgentie.niveau
                }
            }
        });
    }
});