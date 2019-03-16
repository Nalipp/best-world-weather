var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
  cityName: {
    type: String,
  },
  airportCode: {
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
  forcast: {
    type: Object,
  },
  flights: {
    type: Array,
  }
});

var City = mongoose.model('City', citySchema, 'city');

module.exports = City;

