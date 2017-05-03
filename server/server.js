const path = require('path');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
app.use(morgan('dev'));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: "test",
    text: "test",
    createdAt: 123
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createMessage', (message) => {
    console.log(JSON.stringify(message,undefined,2));
  });
});

server.listen(port, () => {
  console.log('Chat app is running on port: ' + port);
});
