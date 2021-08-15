require('dotenv').config();
const express = require('express')
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , viewCtrl = require('./viewController')
  , editCtrl = require('./editorController')
  , config = require('./server-config')
  , massive = require('massive')
  , path = require('path')
  , session = require('express-session')
  , passport = require('passport')
  , Auth0Strategy = require('passport-auth0');

const app = new express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + `/../dist/bonfireSRD`));
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: config.logDomain,
    clientID: config.logId,
    clientSecret: config.logSecret,
    callbackURL: config.logCallback,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    let { displayName, user_id } = profile;
    const db = app.get('db');

    db.findUser([user_id]).then(function (users) {
        if (!users[0]) {
            db.createUser([
                displayName,
                user_id
            ]).then(users => {
                return done(null, users[0].id)
            }).catch(e => console.log(e))
        } else {
            return done(null, users[0].id)
        }
    }).catch(e => console.log(e))
}))

app.use(config.fakeAuth)

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: config.redirect
}));

passport.serializeUser((id, done) => {
    done(null, id)
})
passport.deserializeUser((id, done) => {
    app.get('db').findUserSession([id]).then((user) => {
        return done(null, user[0]);
    })
})

app.get('/auth/logout', function (req, res) {
    req.logOut();
    res.redirect(`/`)
})

// ================================== \\
app.get('/api/allCharacters', viewCtrl.viewAllCharacters)
app.get('/api/view/:id', viewCtrl.viewCharacter)
app.get('/api/character/:id', viewCtrl.getCharacterForCombatCounter)

function checkLogin (req, res, next) {
  if (req.user && req.user.id) {
    next()
  } else {
    res.send({message: 'log on'})
  }
}

app.get('/api/characters', checkLogin, viewCtrl.viewUsersCharacters)
app.patch('/api/removeCharacter/:characterid', checkLogin, editCtrl.removeCharacter)
app.patch('/api/updateSingleThing/:characterid', checkLogin, editCtrl.updateSingleThing)
app.patch('/api/updateSingleThingOnObject/:characterid', checkLogin, editCtrl.updateSingleThingOnObject)

app.post('/api/upsertCharacter', checkLogin, editCtrl.updateOrAddCharacter)
app.post('/api/AddCharacter', checkLogin, editCtrl.addCharacter)

const root = require('path').join(__dirname, '../build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

massive(config.databaseCredentials).then(dbI => {
  app.set('db', dbI)
  app.listen(config.port, async () => {
    console.log(`Weep a thousand tears and you won't drown the desert ${config.port}`);
  });
})
