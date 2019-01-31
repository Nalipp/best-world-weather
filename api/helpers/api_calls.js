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
          visibility: city.data.currently.visibility,
          averageMaxTemp: getTempAverage(city.data.daily.data, 'max'),
          averageMinTemp: getTempAverage(city.data.daily.data, 'min'),
          sunlightHours: getSunlightAverage(city.data.daily.data),
          iconPoints: getIconPoints(city.data.daily.data),
          allIcons: getAllIcons(city.data.daily.data),
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
          averageMaxTemp: getTempAverage(city.data.daily.data, 'max'),
          averageMinTemp: getTempAverage(city.data.daily.data, 'min'),
          sunlightHours: getSunlightAverage(city.data.daily.data),
          iconPoints: getIconPoints(city.data.daily.data),
          allIcons: getAllIcons(city.data.daily.data),
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

function getTempAverage(forcasts, type) {
  var total = 0;

  forcasts.forEach(forcast => {
    total += type === 'max' ? forcast.temperatureMax : forcast.temperatureMin;
  });

  return Math.round(total / forcasts.length);
}

function getSunlightAverage(forcasts) {
  var sunrise = forcasts[0].sunriseTime;
  var sunset = forcasts[0].sunsetTime;
  var totalSeconds = sunset - sunrise;

  var minutes = totalSeconds / 60;
  var hours = minutes / 60;

  var sections = String(hours).split('.');
  return Number(sections[0] + '.' + sections[1].slice(0, 2));
}

function getIconPoints(forcasts) {
  var points = {
    'clear-day': 6,
    'clear-night': 6,
    'partly-cloudy-day': 5,
    'partly-cloudy-night': 5,
    'cloudy': 4,
    'wind': 4,
    'fog': 3,
    'rain': 2,
    'snow': 1,
    'sleet': 0,
  }

  var total = 0;

  forcasts.forEach(forcast => {
    total += points[forcast.icon];
  });

  return total;
}

function getAllIcons(forcasts) {
  var allIcons = [];

  forcasts.forEach(forcast => {
    allIcons.push(forcast.icon)
  });

  return allIcons;
}


module.exports = {
  getForcasts: getForcasts,
  getForcast: getForcast,
}


