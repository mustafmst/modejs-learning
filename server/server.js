const path = require('path');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');
const jqueryPath = path.join(__dirname, '/../node_modules/jquery/dist');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
app.use('/libs', express.static(jqueryPath));
app.use(morgan('dev'));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));

  socket.broadcast.emit('newMessage', generateMessage("Admin", "New user has connected"));

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('createMessage', (message, callback) => {
    console.log(JSON.stringify(message,undefined,2));
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback('This is from the server');
  });
});

server.listen(port, () => {
  console.log('Chat app is running on port: ' + port);
});
