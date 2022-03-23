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
var getCities = require('./helpers/api_calls').getCities;
var getForcast = require('./helpers/api_calls').getForcast;
var getFlights = require('./helpers/api_calls').getFlights;
var worldCities = require('./helpers/cities_list').worldCities;
var cityIdx = 9;

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

app.get('/api/populations/', function(req, res) {
  db.Forcast.find()
    .then(function(forcasts){
      const cityForcasts = forcasts.map(forcast => {
        return {
          cityName: forcast.cityName, 
          population: forcast.population, 
          lat: forcast.lat, 
          lng: forcast.lng, 
        }
      })

      res.json(cityForcasts);
    })
    .catch(function(err){
      res.send(err);
    })
});

app.get('/api/cities/initialize/', function(req, res) {
  // You will not see any cities in the app until after you run forcast/initialize
  // this is because all cities are getting filtered out without any forcast data
  getCities('initialize');
  res.send('cities/initialize...finished')
});

app.get('/api/forcasts/initialize/', function(req, res){
  // 'run db.forcasts.drop() from mongo prior to running'
  getForcasts('initialize');
  res.send('forcast/initialize...finished');
});

app.get('/api/flights/initialize/', function(req, res){
  // allows you to get flight cost data for each city (writes to db)
  // recursive setTimeout avoids rate limit
  // takes about 20 minutes to run
  function getNextForcast() {
    if (worldCities.length === 0) {
      console.log('*****flight requests complete exiting*****');
      return;
    } else {
      setTimeout(function() {
        const curCity = worldCities.pop();
        console.log('processing...', curCity)
        getFlights('SFO', curCity);
        getNextForcast() 
      }, 10000);
    }
  }
  getNextForcast();

  res.send('flight/initialize...finished');
});

app.get('/api/flight-test/', function(req, res) {
  // endpoint for testing single flight price request (wait 10 seconds, writes to db)
  // worldCities[1] is [ 'San Juan', '18.4655', '66.1057', 'SJU' ]
  getFlights('SFO', worldCities[1]);
  res.send('/flight-test...finished');
});

setInterval(function() {
  // updats the flight cost of a city once every hour
  // the api rate limit of v2 is 2000 per month
  getFlights('sfo', worldCities[cityIdx % worldCities.length - 1]);
  cityIdx++;
}, 3400000);

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
