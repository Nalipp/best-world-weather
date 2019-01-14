var mongoose = require('mongoose');
mongoose.set('debug', true);

if (process.env.MONGO_URI) {
  console.log('connecting to MONGO_URI..');
  mongoose.connect(process.env.MONGO_URI);
} else {
  console.log('connecting to localhost/world-weather...');
  mongoose.connect('mongodb://localhost/world-weather');
}

mongoose.Promise = Promise;

module.exports.Forcast = require("./forcast");
