const {Todo} = require('../../server/models/todo');
const {User} = require('../../server/models/user');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'pawel.mstowski@gmail.com',
  password: '123ewq',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'mustaf').toString()
  }]
}, {
  _id: userTwoId,
  email: 'mustafmst@gmail.com',
  password: '123ewq'
}];

const todos = [{
  text: 'first todo',
  _id: new ObjectID()
},{
  text: 'second todo',
  _id: new ObjectID()
},{
  _id: new ObjectID(),
  text: "third todo",
  completed: true
}];

const populateTodos = (done) => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({})
    .then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  users,
  todos,
  populateUsers,
  populateTodos
}