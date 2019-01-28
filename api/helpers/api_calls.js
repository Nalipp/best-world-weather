var axios = require('axios');
var db = require('../models');
var worldCities = require('./cities_list').worldCities;
var DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;

function getForcast(lat, lng, cb) {
    axios.get(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}?exclude=minutely,hourly`)
      .then(city => {
        var currentCity = {
          summary: city.data.currently.summary,
          icon: city.data.currently.icon,
          precipIntensity: city.data.currently.precipIntensity,
          precipProbability: city.data.currently.precipProbability,
          temperature: city.data.currently.temperature,
          apparentTemperature: city.data.currently.apparentTemperature,
          humidity: city.data.currently.humidity,
          windSpeed: city.data.currently.windSpeed,
          cloudCover: city.data.currently.cloudCover,
          uvIndex: city.data.currently.uvIndex,
          visibility: city.data.currently.visibility
        };

        cb(currentCity)
      })
      .catch(err => {
        console.log('err with darksky api request...', err);
      })
}

function getForcasts(type) {
  var promises = [];

  worldCities.forEach(function(city) {
    var curCityName = city[0];
    var lat = city[1];
    var lng = city[2];

    var promise = axios.get(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}?exclude=minutely,hourly`, { cityName: curCityName})
    promises.push(promise);
  });

  Promise.all(promises)
    .then(function(results) {
      results.forEach(function(city) {

        var currentCity = {
          cityName: city.config.cityName,
          summary: city.data.currently.summary,
          icon: city.data.currently.icon,
          precipIntensity: city.data.currently.precipIntensity,
          precipProbability: city.data.currently.precipProbability,
          temperature: city.data.currently.temperature,
          apparentTemperature: city.data.currently.apparentTemperature,
          humidity: city.data.currently.humidity,
          windSpeed: city.data.currently.windSpeed,
          cloudCover: city.data.currently.cloudCover,
          uvIndex: city.data.currently.uvIndex,
          visibility: city.data.currently.visibility
        };

        if (type === 'update') {
          db.Forcast.update({cityName: city.config.cityName}, currentCity)
            .then(function(res) {
              console.log('successful update...', city.config.cityName);
            })
            .catch(function(err) {
              console.log('err updating database...', err);
            })
        } else if (type === 'initialize') {
          db.Forcast.create(currentCity)
            .then(function(res) {
              console.log('successful initialization...', currentCity.cityName);
            })
            .catch(function(err) {
              console.log('err initializing database...', err);
            })
        } else {
          console.log(`err... getForcasts(type), type ${type} is not defined`)
        }
      })
    .catch(function(err) {
      console.log('err receiving forcasts data...', err);
    });
  })
}

module.exports = {
  getForcasts: getForcasts,
  getForcast: getForcast,
}


