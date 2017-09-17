const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = require('bluebird');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const application = express();

const Users = require('./models/user');
const Spots = require('./models/spot')
const spots = require('./routes/spots');
const users = require('./routes/users');

const moment = require('moment');
moment().format();

application.set('port', process.env.PORT || 3000);

mongoose.connect('mongodb://heroku_76sb1wp1:v5jkraep94cvhegpahg1g0caoo@ds139984.mlab.com:39984/heroku_76sb1wp1');

const mongoDB = 'mongodb://127.0.0.1/Maps';
mongoose.connect(mongoDB);

application.use(bodyParser.json());

application.use(passport.initialize());

application.use(express.static(path.join(__dirname, 'client/public')));

application.use(spots);
application.use(users);

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'icanauthenticatestuff';

const strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
  var user = await Users.find({id: jwt_payload.id});
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

application.listen(application.get('port'), () => {
  console.log(`Listening on port ${application.get('port')}`)
});