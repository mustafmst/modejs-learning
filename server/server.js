var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

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

app.listen(port, () => {
  //console.log('Started server on port: 3000');
})

module.exports = {
  app
};
