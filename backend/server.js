import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
const app = express();
// parse application/json
app.use(bodyParser.json());
// connection url
const dbUrl = 'mongodb://localhost/crudwithredux';
function validate(game) {
  const errors = {};
  if(game.title === '') { errors.title = "Title can't be blank"}
  if(game.cover === '') { errors.cover = "Cover can't be blank"}
  const isValid = Object.keys(errors).length === 0
  return { errors, isValid }
}
mongodb.MongoClient.connect(dbUrl, function(err, db) {
  app.get('/api/games', (req, res) => {
    // get the games collection and find all documents from mongodb
    db.collection('games').find({}).toArray((err, games) => {
      res.json({ games });
    })
  })

  app.get('/api/games/:_id', (req, res) => {
    db.collection('games').findOne({_id: new mongodb.ObjectId(req.params._id)}, (err, game) => {
      res.json({game});
    })
  })

  app.post('/api/games', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if(isValid) {
      const {title, cover} = req.body;
      db.collection('games').insert({ title, cover }, (err, result) => {
        if(err) {
          res.status(500).json({ errors: { global: "Something went wrong"}});
        } else {
          res.json({ game: result.ops[0] });
        }
      });

    } else {
      res.status(404).json({ errors })
    }
  })

  app.put('/api/games/:_id', (req, res) => {
    const {errors, isValid} = validate(req.body);
    if(isValid) {
      const { title, cover } = req.body;
      db.collection('games').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: { title, cover } },
        { returnOriginal: false },
        (err, result) => {
          if(err) { res.status(500).json({ errors: {global: err}}); return; }
          res.json({ game: result.value });
        }
      )
    } else {
      res.status(400).json({ errors })
    }
  })

  // wait for delete request and delete from it from mongodb
  app.delete('/api/games/:id', (req, res) => {
    db.collection('games').deleteOne({_id: new mongodb.ObjectId(req.params.id)}, (err, r) => {
      if(err) { res.status(500).json({errors: { global: err }}); return; }
      res.json({})
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
