const { MongoClient, ObjectID } = require('mongodb');

// TodoApp need other name
MongoClient.connect('mongodb://localhost:27017/budgetApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');
  const db = client.db('budgetApp');

  client.close();
});
