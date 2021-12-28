var axios = require('axios');
var db = require('../models');
var worldCities = require('./cities_list').worldCities;
var DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
var AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
var AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

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
        averageMaxTemp: getTempAverage(city.data.daily.data, 'apparentTemperatureMax'),
        averageMinTemp: getTempAverage(city.data.daily.data, 'apparentTemperatureMin'),
        averageApparentTemperatureMaxMin: getTempAverageMaxMin(city.data.daily.data),
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

    var promise = axios.get(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${lat},${lng}?exclude=minutely,hourly`, { cityName: curCityName, lat: lat, lng: lng })
    promises.push(promise);
  });

  Promise.all(promises)
    .then(function(results) {
      results.forEach(function(city) {

        var currentCity = {
          cityName: city.config.cityName,
          lat: city.config.lat,
          lng: city.config.lng,
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
          averageMaxTemp: getTempAverage(city.data.daily.data, 'apparentTemperatureMax'),
          averageMinTemp: getTempAverage(city.data.daily.data, 'apparentTemperatureMin'),
          averageApparentTemperatureMaxMin: getTempAverageMaxMin(city.data.daily.data),
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
          db.Forcast.update({cityName: city.config.cityName}, currentCity, { upsert : true })
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
  })
}

function getTempAverageMaxMin(forcasts) {
  var averageApparentTempMax = getTempAverage(forcasts, 'apparentTemperatureMax');
  var averageApparentTempMin = getTempAverage(forcasts, 'apparentTemperatureMin');
  var average = (averageApparentTempMin + averageApparentTempMax) / 2;

  return average;
}

function getTempAverage(forcasts, type) {
  var total = 0;

  forcasts.forEach(forcast => {
    total += forcast[type];
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

  if (sections[1]) {
    return Number(sections[0] + '.' + sections[1].slice(0, 2));
  } else {
    return 0;
  }
}

function getIconPoints(forcasts) {
  var points = {
    'clear-day': 3,
    'clear-night': 3,
    'partly-cloudy-day': 2,
    'partly-cloudy-night': 2,
    'cloudy': 0,
    'wind': 0,
    'fog': -1,
    'rain': -2,
    'snow': -3,
    'sleet': -4,
  }

  var total = 0;

  forcasts.forEach((forcast, idx) => {
    if (idx < 5) {
      total += points[forcast.icon] ? points[forcast.icon] : 0;
    }
  });

  return total;
}

function getFlights(flightOriginCity, flightDestinationArr) {
  var current = new Date().getTime();
  var threeDays = 86400000 * 3;
  var threeDaysLater = new Date(current + threeDays).toJSON().slice(0, 10);
  var tenDaysLater = new Date(current + (86400000 * 10)).toJSON().slice(0, 10);

  var headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };

  axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`, {headers: headers})
    .then(res => {
      var headerObject = { headers: { "Authorization": "Bearer " + res.data.access_token} }
      console.log('flightOriginCity... ', flightOriginCity);
      console.log('flightDestinationArr... ', flightDestinationArr[0], flightDestinationArr[3]);
      console.log('threeDaysLater... ', threeDaysLater);
      console.log('tenDaysLater... ', tenDaysLater);
      axios.get(`https://test.api.amadeus.com/v1/shopping/flight-offers?origin=${flightOriginCity}&destination=${flightDestinationArr[3]}&departureDate=${threeDaysLater}&returnDate=${tenDaysLater}&adults=1&nonStop=false&max=1&currency=USD`, headerObject)
        .then(res => {
          console.log('flightCost query successful...', flightDestinationArr[0])
          var allFlights = res.data.data[0].offerItems[0].services[0].segments;
          var flightCost = res.data.data[0].offerItems[0].price.total;
          var likleyLayoverCount = allFlights.length
          var firstDeparture = allFlights[0].flightSegment.departure.at;
          var lastArrivial = allFlights[allFlights.length - 1].flightSegment.arrival.at;
          var departEpochMilliseconds = Date.parse(firstDeparture);
          var ariveEpochMilliseconds = Date.parse(lastArrivial);
          var totalSeconds = (ariveEpochMilliseconds - departEpochMilliseconds) / 1000;
          
          var sec = format(totalSeconds % 60);
          var min = format(Math.floor(totalSeconds / 60) % 60);
          var hour = format(Math.floor(totalSeconds / 3600));

          function format(time) {
            return time < 10 ? '0' + time : String(time);
          }

          var travelTimeString = `${hour}:${min}:${sec}`;

          console.log('total travel time...', travelTimeString);
          console.log('likley layover count', likleyLayoverCount);

          var flights = {
            cost: flightCost,
            timeSeconds: totalSeconds,
            timeString: travelTimeString,
            layoverCount: likleyLayoverCount,
          }

          flightKey = `flights.${flightOriginCity}`
          console.log(flightKey);

          db.Forcast.update({cityName: flightDestinationArr[0]},{$set : {[flightKey]: flights}})
            .then(res => {
              console.log('database updated successfully...', res);
            })
            .catch(err => { 
              console.log('err updating database...', err.response.data)
            })
        })
        .catch(err => { 
          console.log('err getting flightCost value...', err.response.data)
          db.Forcast.update({cityName: flightDestinationArr[0]}, {$set: {flights: {
            cost: 'NA',
            timeSeconds: 'NA',
            timeString: 'NA',
            layoverCount: 'NA',
          }}})
            .then(res => {
              console.log('flight cost set to NA...', flightDestinationArr[0]);
            })
            .catch(err => {
              console.log('unable to update flight cost to NA in database...', err);
            })
        })
    })
    .catch(err => { 
      console.log('unable to gain access token...', err) 
    })
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
  getFlights: getFlights,
}
