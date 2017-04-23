const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

var {app} = require('../server/server');
var {Todo} = require('../server/models/todo');

const todos = [{
  text: 'first todo',
  _id: new ObjectID()
},{
  text: 'second todo',
  _id: new ObjectID()
}];

beforeEach((done) => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {

  it('should create new todo', (done) => {
    var text = 'test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find({text})
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch((err) => done(err));
      });
  });

  it('should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch((err) => done(err));
      });
  });

});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc when valid id is provided', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 error if todo not found', (done) => {
    var notExistingId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${notExistingId}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe(`There is no todo with id: ${notExistingId}`);
      })
      .end(done);
  });

  it('should return 404 error for non-object id', (done) => {
    var invalidId = '111';
    request(app)
      .get(`/todos/${invalidId}`)
      .expect(404)
      .expect((res) => {
        expect(res.body.message).toBe('Id is invalid');
      })
      .end(done);
  });
});
