const {env} = require('./config/config');
const _ = require('lodash');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {authenticate} = require('./middleware/authenticate');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


const port = process.env.PORT;

var app = express();


app.use(bodyParser.json());
if(env === 'development'){
  app.use(morgan('dev'));
}

app.post('/todos', authenticate, (req,res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  }).save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/todos', authenticate, (req,res) => {
  Todo.find({
    _creator: req.user._id
  })
    .then((todos) => {
      res.send({todos});
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/todos/:id', authenticate, (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send({
      message: 'Id is invalid',
    });
  }
  Todo.findOne({
    _id: req.params.id,
    _creator: req.user._id
  })
    .then((todo) => {
      if(!todo){
        return res.status(404).send({
          message: `There is no todo with id: ${id}`
        });
      }
      res.send({todo});
    })
    .catch((err) => {
      return res.status(400).send({});
    });
});

app.delete('/todos/:id', authenticate, (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send({message: 'ID is invalid'});
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
    .then((todo) => {
      if(!todo){
        return res.status(404).send({message:`There is no todo with id: ${id}`});
      }
      res.send({todo});
    })
    .catch((err) => {
      res.status(400).send();
    });
})

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send({message: 'ID is invalid'});
  }

  if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
  } else {
      body.completed = false;
      body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  },{$set: body}, {new: true})
    .then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body,["email", "password"]);
  var user = new User({
    email: body.email,
    password: body.password
  });

  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      res.header('x-auth',token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req,res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredencials(body.email, body.password)
    .then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch((err) => {
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  if(env != 'test'){
    console.log('env ====> ' + env);
    console.log('Started server on port: ' + port);
  }
});

module.exports = {
  app
};
