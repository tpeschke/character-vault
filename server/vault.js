require('dotenv').config();
const express = require('express')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , viewCtrl = require('./viewController')
  , editCtrl = require('./editorController')
  , config = require('./server-config')
  , massive = require('massive')
const path = require('path');

const app = new express();
app.use(bodyParser.json());
app.use(cors())

app.use(config.fakeAuth)

app.get('/api/characters', viewCtrl.viewUsersCharacters)
app.get('/api/view/:id', viewCtrl.viewCharacter)
app.get('/api/download/:id', viewCtrl.downloadCharacters);

app.post('/api/upsertCharacter', editCtrl.updateOrAddCharacter)
app.post('/api/AddCharacter', editCtrl.addCharacter)

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './index.html'));
// });

massive(config.connection).then(dbI => {
  app.set('db', dbI)
  app.listen(config.port, async () => {
    console.log(`Weep a thousand tears and you won't drown the desert ${config.port}`);
  });
})
