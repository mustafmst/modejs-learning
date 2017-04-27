const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI);

module.exports = {
  mongoose
};
