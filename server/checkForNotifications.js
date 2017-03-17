if(Meteor.isServer) {
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);

    Meteor.setInterval(function(){
        var takenSize = Taken.find({"Einddatum": {$gte: start, $lt: end}}).count();
        var taak = Taken.find({"Einddatum": {$gte: start, $lt: end}}).fetch();
        var dataTaak;

        for(var i=0; i < takenSize; i++) {
            dataTaak = {
                Type: "taak",
                Titel: taak[i].Titel,
                Omschrijving: taak[i].Omschrijving,
                Einddatum: taak[i].Einddatum,
                Eindtijd: taak[i].Eindtijd,
                Uitvoerder: {
                  _id: taak[i].Uitvoerder._id,
                }
            }
            Meteor.call('notifications.insert', dataTaak);
        }

        var afsprakenSize = Afspraken.find({"Einddatum": {$gte: start, $lt: end}}).count();
        var afspraak = Afspraken.find({"Einddatum": {$gte: start, $lt: end}}).fetch();
        var dataAfspraak;

        for(var i=0; i < afsprakenSize; i++) {
            dataAfspraak = {
                Type: "afspraak",
                Titel: afspraak[i].Titel,
                Omschrijving: afspraak[i].Omschrijving,
                Einddatum: afspraak[i].Einddatum,
                Eindtijd: afspraak[i].Eindtijd,
                Uitvoerder: {
                  _id: afspraak[i].Uitvoerder._id,
                }
            }
            Meteor.call('notifications.insert', dataAfspraak);
        }

    }, 10000);
}