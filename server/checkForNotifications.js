if(Meteor.isServer) {
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);

    Meteor.setInterval(function(){
        var takenSize = Taken.find({"Einddatum": {$gte: start, $lt: end}}).count();
        var taak = Taken.find({"Einddatum": {$gte: start, $lt: end}}).fetch();
        var data;

        for(var i=0; i < takenSize; i++) {
            data = {
                Type: "taak",
                Titel: taak[i].Titel,
                Omschrijving: taak[i].Omschrijving,
                Einddatum: taak[i].Einddatum,
                Eindtijd: taak[i].Eindtijd
            }
            Meteor.call('notifications.insert', data);
        }
    }, 10000);
}