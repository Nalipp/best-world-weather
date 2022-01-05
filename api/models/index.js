var mongoose = require('mongoose');
mongoose.set('debug', true);
const Forcast = require("./forcast");
const Population = require("./population");
const City = require("./city");

if (process.env.MONGODB_URI) {
  console.log('connecting to MONGO_URI..');
  mongoose.connect(process.env.MONGO_URI);
} else {
  console.log('connecting to localhost/world-weather...');
  mongoose.connect('mongodb://localhost/world-weather');
}

mongoose.Promise = Promise;

module.exports = {
  Forcast,
  Population,
  City,
}
