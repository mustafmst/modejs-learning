const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ToDoApp');

module.exports = {
  mongoose
};
