const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost/ToDoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to database');
  }
  console.log('Connected to database');

  db.collection('ToDos').insertOne({
    text: 'eat',
    completed: false
  }, (err, res) => {
    if(err){
      return console.log('There was an error with inserting the data to ToDos collection', err);
    }
    console.log(JSON.stringify(res.ops, undefined, 2));
  });

  //db.collection('Users').insertOne({
  //  name: 'Ania',
  //  age: 23,
  //  location: 'Kraków'
  //},(err, result) => {
  //  if(err){
  //    return console.log('Tere was an error with inserting data to Users collection', err);
  //  }
  //  console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  //});

  db.close();
});
