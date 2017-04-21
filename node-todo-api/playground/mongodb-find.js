const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost/ToDoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to database');
  }
  console.log('Connected to database');

  //db.collection('ToDos').find({
  //    _id: new ObjectID("58fa41d900099ba67831bc27")
  //  }).toArray()
  //  .then((docs) => {
  //    console.log(JSON.stringify(docs, undefined, 2));
  //  })
  //  .catch((err) => {
  //    console.log(err);
  //  });

  //db.collection('ToDos').find().count()
  //  .then((count) => {
  //    console.log(`Todos count: ${count}`);
  //  })
  //  .catch((err) => {
  //    console.log(err);
  //  });

  db.collection('Users').find({
    name: 'Pawel'
  }).toArray()
    .then((docs) => {
      console.log(JSON.stringify(docs, undefined, 2));
    })
    .catch((err) => {
      console.log(err);
    });

  db.close();
});
