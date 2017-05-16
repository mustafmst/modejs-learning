const path = require('path');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');

const {isRealString} = require('./utils/validation');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');
const jqueryPath = path.join(__dirname, '/../node_modules/jquery/dist');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));
app.use('/libs', express.static(jqueryPath));
app.use(morgan('dev'));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined`));
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUser(user.room));
      io.to(user.room).emit('newMessage', generateMessage("Admin", `${user.name} has left the room`));
    }
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage(coords.from, coords.latitude, coords.longitude));
  });

  socket.on('createMessage', (message, callback) => {
    console.log(JSON.stringify(message,undefined,2));
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback();
  });
});

server.listen(port, () => {
  console.log('Chat app is running on port: ' + port);
});
