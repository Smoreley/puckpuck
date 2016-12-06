var url = "mongodb://keybit:password@ds119588.mlab.com:19588/heroku_6db1wpxz";

var express = require('express');
var app = express();

var mongodb = require('mongodb');

app.set('port', (process.env.PORT || 5000));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Get Requests
app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/stats', function(req, res) {
//    res.render("pages/stats");
    
    var MongoClient = mongodb.MongoClient;
    MongoClient.connect(url, function(err, db) {
       if(err) {
           console.log("Unable to connect to the server", err);
       } else {
           console.log("Connection Established");
           var collection = db.collection("playerstats");
           
           collection.find({}).toArray(function(err, result) {
               if(err) {
                   res.send(err);
               } else if (result.length) {
                   res.render("pages/stats", {"pages" : result});
               } else {
                   res.send("No documents found");
               }
           });
       }
    });
    
});

app.get('/guide', function(req, res) {
  res.render("pages/guide");
});

app.post('/findPlayer', function(req, res) {
    
    var MongoClient = mongodb.MongoClient;
    MongoClient.connect(url, function(err, db) {
       if(err) {
           console.log("Unable to connect to the server", err);
       } else {
           console.log("Connection Established\n");
           var collection = db.collection("playerstats");
           
           collection.find({name: req.body.name}).toArray(function(err, result) {               
              if(err) {
                  res.send(err);
              } else if (result.length) {
                  res.render("pages/stats", {"pages" : result});
              } else {
                  res.send("No documents found");
              }
           });
       }
    });
});

app.post("/savePlayerScore", function(req, res) {
    
    var MongoClient = mongodb.MongoClient;
    MongoClient.connect(url, function(err, db) {
       if(err) {
           console.log("Unable to connect to the server", err);
       } else {
           console.log("Connection Established");
           var collection = db.collection("playerstats");
           
           // If name doesn't exist create it
           collection.update({name: req.body.name}, {$set:{name: req.body.name}, $max:{score: req.body.score}}, {upsert:true}, function(err, result) {
              if(err) {
                   res.send(err);
               } else {
//                   collection.update({name: req.body.name}, {$addToSet:{levels:{name: req.body.level, score: req.body.score}}});
//                   res.send(result);
                   res.send(req.body);
               }
               db.close();
           });        
       }
    });
    // Testing
    //    res.send(req.body);
});

app.post("/posttest", function(req, res) {
    console.log("\n\ntesting");
    console.log(req.body.name);
    res.send(req.body);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


