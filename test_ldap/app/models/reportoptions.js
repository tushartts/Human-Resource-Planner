var mongoclient = new mono.Server("localhost", 27017,  {safe:false}, {native_parser: true},{auto_reconnect: true});
var db = new mono.Db('hydlogs',mongoclient);
db.open(function(){});

app.post('/api/reports',function(req,res,$filter){
      console.log("in post");
      console.log(req.body.text);
      console.log(req.body.value);
      console.log(req.body.startDate);
      console.log(req.body.endDate);
      console.log(req.body.selected_items);
      var select=[];
      select = req.body.selected_items.split(',');
      console.log(select);
      var query= { 'alerttype' : { $in: select  }};
      var collection = db.collection('error_notrequired');
      collection.find(query).toArray(function(err, doc) {
      if(doc != null) console.log("Doc from Each ");
      if(err){ console.log("Error"+err);}
      res.json(doc);
      });
});


