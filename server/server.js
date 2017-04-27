const env = require('./config/config').env;
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT;

var app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
  if(env === 'test')
  {
    console.log(JSON.stringify(req.body, undefined, 2));
  }
  next();
});

app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  }).save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/todos', (req,res) => {
  Todo.find()
    .then((todos) => {
      res.send({todos});
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send({
      message: 'Id is invalid',
    });
  }
  Todo.findById(req.params.id)
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

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send({message: 'ID is invalid'});
  }

  Todo.findByIdAndRemove(id)
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

app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id,{$set: body}, {new: true})
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

app.listen(port, () => {
  if(env != 'test'){
    console.log('env ====> ' + env);
    console.log('Started server on port: ' + port);
  }
});

module.exports = {
  app
};
