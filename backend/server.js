import express from 'express';
import mongodb from 'mongodb';
const app = express();
// connection url
const dbUrl = 'mongodb://localhost/crudwithredux';
mongodb.MongoClient.connect(dbUrl, function(err, db) {
  app.get('/api/games', (req, res) => {
    // get the games collection and find all documents from mongodb
    db.collection('games').find({}).toArray((err, games) => {
      res.json({ games });
    })
  })

  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: "Still working on it.Please try again later when we implement it"
      }
    })
  })

  // starts a server and listens on port 8080 for connections.
  app.listen(8080, () => console.log('Server is running on localhost:8080'))
});
