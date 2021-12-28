require('dotenv').config()
var https = require("https");
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./models');
var axios = require('axios');
var getForcasts = require('./helpers/api_calls').getForcasts;
var getForcast = require('./helpers/api_calls').getForcast;
var getFlights = require('./helpers/api_calls').getFlights;
var worldCities = require('./helpers/cities_list').worldCities;
var cityIdx = 9;

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/initialize/', function(req, res){
  // 'run db.forcasts.drop() from mongo prior to running'
  getForcasts('initialize');
  res.send('done');
})

app.get('/api/forcasts/', function(req, res){
  db.Forcast.find()
    .then(function(forcasts){
      res.json(forcasts);
    })
    .catch(function(err){
      res.send(err);
    })
})

app.get('/api/populations/', function(req, res) {
  db.Population.find()
    .then(function(populations){
      res.json(populations.slice(0, 10000));
    })
    .catch(function(err){
      res.send(err);
    })
});

setInterval(function() {
  getFlights('sfo', worldCities[cityIdx % worldCities.length - 1]);
  cityIdx += 1;
}, 1200000);

setInterval(function() {
  getForcasts('update'); 
}, 43200000); // update cities in the database every 12 hours

setInterval(function() {
  https.get("https://best-world-weather.herokuapp.com/", res => {
    console.log(res.statusCode);
  });
}, 1700000); // ping the website every 30 minutes to wake heroku

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
})
