var axios = require('axios');
var db = require('../models');
var worldCities = require('./cities_list').worldCities;
var DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;

function initializeCityData() {
  // db.forcasts.drop() before running so there are no duplicates
  var promises = [];

  worldCities.forEach(function(city) {
    var curCityName = city[0];
    var lat = city[1];
    var lng = city[2];

    var promise = axios.get(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}?exclude=minutely,hourly`, { cityName: curCityName})
    promises.push(promise);
  });

  Promise.all(promises).then(function(results) {
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

      db.Forcast.create(currentCity)
      .then(function(res) {
        console.log('successful initialization...', currentCity.cityName);
      })
      .catch(function(err) {
        console.log('err initializing database...', err);
      })
    })
  })
}

function updateCityData() {
  var promises = [];

  worldCities.forEach(function(city) {
    var curCityName = city[0]
    var lng = city[1];
    var lat = city[2];
    var promise = axios.get(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lng},${lat}?exclude=minutely,hourly`, { cityName: curCityName})
    promises.push(promise);
  });

  Promise.all(promises).then(function(results) {
    results.forEach(function(city) {
      db.Forcast.update({cityName: city.config.cityName}, {
          cityName: city.config.cityName,
          summary: city.data.currently.summary,
          temperature: city.data.currently.summary,
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
        }).then(function(res) {
          console.log('successful update...', city.config.cityName);
        })
        .catch(function(err) {
          console.log('err updating database...', err);
        });
    })
  })
}

module.exports = {
  initializeCityData: initializeCityData,
  updateCityData: updateCityData,
}


