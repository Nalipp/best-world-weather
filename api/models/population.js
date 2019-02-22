var mongoose = require('mongoose');

var populationSchema = new mongoose.Schema({
  cityName: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  countryCode: {
    type: String,
  },
  population: {
    type: Number,
  },
  elevation: {
    type: Number,
  },
  timezone: {
    type: String,
  },
});

var Population = mongoose.model('Population', populationSchema, 'populations');

module.exports = Population;
