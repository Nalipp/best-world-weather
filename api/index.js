var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./models');
var axios = require('axios');
var getForcasts = require('./helpers/api_calls').getForcasts;
var getForcast = require('./helpers/api_calls').getForcast;

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

app.post('/api/forcast/', function(req, res) {
 getForcast(req.body.lat, req.body.lng, function(data) {
   res.send(data);
 });
})

// getForcasts('initialize') // 'only run after db.forcasts.drop()'
// getForcasts('update');

setInterval(function() {
  getForcasts('update'); // update cities in the database every 12 hours
}, 43200000);

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
})
