const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/ToDoApp';

mongoose.connect(dbURI);

module.exports = {
  mongoose
};
