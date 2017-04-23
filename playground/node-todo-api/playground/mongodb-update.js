const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost/ToDoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to database');
  }
  console.log('Connected to database');

  //db.collection('ToDos').findOneAndUpdate({
  //  _id: new ObjectID("58fa4ae0d2dc372115920eba")
  //}, {
  //  $set: {
  //    completed: true
  //  }
  //}, {
  //  returnOriginal: false
  //})
  //.then((res) => {
  //  console.log(res);
  //});

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("58fa3bc39e212a11832ebfc2")
  }, {
    $set:{
      name: 'Pawel'
    },
    $inc:{
      age: 1
    }
  })

  db.close();
});
