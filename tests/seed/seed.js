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
  password: '123ewq',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, 'mustaf').toString()
  }]
}];

const todos = [{
  text: 'first todo',
  _id: new ObjectID(),
  _creator: userOneId
},{
  text: 'second todo',
  _id: new ObjectID(),
  _creator: userOneId
},{
  _id: new ObjectID(),
  text: "third todo",
  completed: true,
  _creator: userOneId
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
