const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {User} = require('../server/models/user');

var id = '58fb1a0c1c1feacf14ef644b';

User.findById(id)
  .then((user) => {
    if(!user){
      return console.log('No such user in db.');
    }
    console.log('User: ', JSON.stringify(user,undefined,2));
  }).catch((err) => {
    console.log(err);
});

//if(!ObjectID.isValid(id)){
//  console.log('Id not valid');
//}
//
//Todo.find({
//  _id: id
//}).then((todos) => {
//    console.log(JSON.stringify(todos, undefined, 2));
//});
//
//Todo.findOne({
//  _id: id
//}).then((todo) => {
//    console.log(JSON.stringify(todo, undefined, 2));
//  });
//
//Todo.findById(id)
//  .then((todo) => {
//    if(!todo){
//      return console.log('not found');
//    }
//    console.log(JSON.stringify(todo, undefined, 2));
//  }).catch((err) => {
//    console.log(err);
//  });
