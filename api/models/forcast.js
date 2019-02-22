var mongoose = require('mongoose');

var forcastSchema = new mongoose.Schema({
    cityName: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    summary: {
      type: String,
    },
    icon: {
      type: String,
    },
    precipIntensity: {
      type: String,
    },
    precipProbability: {
      type: String,
    },
    temperature: {
      type: Number,
    },
    apparentTemperature: {
      type: Number,
    },
    humidity: {
      type: Number,
    },
    windSpeed: {
      type: Number,
    },
    cloudCover: {
      type: Number,
    },
    uvIndex: {
      type: Number,
    },
    averageMaxTemp: {
      type: Number,
    },
    averageMinTemp: {
      type: Number,
    },
    averageApparentTemperatureMaxMin: {
      type: Number,
    },
    sunlightHours: {
      type: Number,
    },
    iconPoints: {
      type: Number,
    },
    iconPoints: {
      type: Number,
    },
    allIcons: {
      type: [String],
    },
});

var Forcast = mongoose.model('Forcast', forcastSchema, 'forcasts');

module.exports = Forcast;
