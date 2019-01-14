var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./models');
var axios = require('axios');
    
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/forcasts/', function(req, res){
  db.Forcast.find()
  .then(function(forcasts){
    res.json(forcasts);
  })
  .catch(function(err){
    res.send(err);
  })
})

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
})
