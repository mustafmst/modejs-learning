const path = require('path');
const express = require('express');
const morgan = require('morgan');

const port = 3000;
const publicPath = path.join(__dirname, '/../public');

var app = express();
app.use(express.static(publicPath));
app.use(morgan('dev'));

app.listen(port, () => {
  console.log('Chat app is running on port: ' + port);
});
