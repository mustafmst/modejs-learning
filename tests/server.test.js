describe('Server tests', () => {
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
},{
  _id: new ObjectID(),
  text: "third todo",
  completed: true
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
            expect(todos.length).toBe(todos.length);
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
        expect(res.body.todos.length).toBe(todos.length)
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

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var id = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.findById(id)
          .then((todo) => {
            expect(todo).toNotExist();
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
  });

  it('should return 404 if todo not found', (done) => {
    var id = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if id is invalid', (done) => {
    var id = '123';

    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update a todo', (done) => {
    var id = todos[1]._id.toHexString();
    var newText = "Updated Todo";

    request(app)
      .patch(`/todos/${id}`)
      .send({text: newText})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.findById(id)
          .then((todo) => {
            expect(todo.text).toBe(newText);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
  });
  it('should return 404 if todo not found', (done) => {
    var id = new ObjectID().toHexString();
    var newText = "Updated Todo";

    request(app)
      .patch(`/todos/${id}`)
      .send({text: newText})
      .expect(404)
      .end(done);
  });
  it('should return 404 if id is invalid', (done) => {
    var id = todos[1]._id.toHexString()+"123";
    var newText = "Updated Todo";

    request(app)
      .patch(`/todos/${id}`)
      .send({text: newText})
      .expect(404)
      .end(done);
  });
  it('should update completedAt field with completed set to true', (done) => {
    var id = todos[1]._id.toHexString();

    request(app)
      .patch(`/todos/${id}`)
      .send({completed: true})
      .expect(200)
      .end((err) => {
        if(err){
          done(err);
        }
        Todo.findById(id)
          .then((todo) => {
            expect(todo.completed).toBe(true);
            expect(todo.completedAt).toNotBe(null).toBeA('number');
            done();
          })
          .catch((e) => done(e));
      });
  });
  it('should clear completedAt when todo is not completed',(done) => {
    var id = todos[2]._id.toHexString();

    request(app)
      .patch(`/todos/${id}`)
      .send({completed: false})
      .expect(200)
      .end((err) => {
        if(err){
          done(err);
        }
        Todo.findById(id)
          .then((todo) => {
            expect(todo.completed).toBe(false);
            expect(todo.completedAt).toBe(null);
            done();
          })
          .catch((e) => done(e));
      });
  });
});
});
