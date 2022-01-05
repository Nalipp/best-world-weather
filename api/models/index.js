var mongoose = require('mongoose');
mongoose.set('debug', true);
const Forcast = require("./forcast");
const Population = require("./population");
const City = require("./city");

let uri;

if (process.env.MONGODB_URI) {
  uri = process.env.MONGODB_URI;
} else {
  uri = 'mongodb://localhost/world-weather';
}

const options = {
  useMongoClient: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

mongoose.connect(uri, options, (err, db) => {
  if (err) console.log('error connecting to mongodb...', err)
  else console.log('connection to mongodb successful..');
})

mongoose.Promise = Promise;

module.exports = {
  Forcast,
  Population,
  City,
}
