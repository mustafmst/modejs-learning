const {MongoClient, ObjectID} = require('mongodb');
  // deleteMany, deleteOne, findOneAndDelete
MongoClient.connect('mongodb://localhost/ToDoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to database');
  }
  console.log('Connected to database');

  //db.collection('ToDos'). deleteMany({
  //  text: 'buy groceries'
  //}).then((result) => {
  //  console.log(result);
  //});

  //db.collection('ToDos').deleteOne({
  //  text: 'eat'
  //}).then((result) => {
  //  console.log(result);
  //});

  //db.collection('ToDos').findOneAndDelete({
  //  _id: new ObjectID("58fa4adf3524342107b07093")
  //}).then((result) => {
  //  console.log(result);
  //});

  var Users = db.collection('Users');
  Users.deleteMany({
    name: 'Pawel'
  });
  Users.findOneAndDelete({
    _id: new ObjectID("58fa46f31386e31e2cbf235f")
  });

  db.close();
});
