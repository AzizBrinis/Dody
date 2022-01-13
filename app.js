require('dotenv').config({path : "./config/.env"});
const connectDB = require("./config/connectDB");
const User = require("./models/user");
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const cors = require('cors')

const app = express();



app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(
    cors({
        origin: '*',
        methods: "GET, POST, PATCH, DELETE, PUT",
        allowedHeaders: "Content-Type, Authorization",
    }))
app.use(session({
    secret : "Little Secret",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

connectDB();


passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

    ////////////////////////////////////////////////////////////: Facebook :////////////////////////////////////////////////////////////////


    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:8000/auth/facebook/secrets"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    app.post('/auth/facebook',
      passport.authenticate('facebook'));
    
    app.get('/auth/facebook/secrets',
      passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/');
      });
    
    
    ////////////////////////////////////////////////////////////: Google :////////////////////////////////////////////////////////////////

  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.post('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/');
  });
   ////////////////////////////////////////////////////////////: Routes :////////////////////////////////////////////////////////////////


app.use("", require("./routes/user"));



const port = process.env.PORT || 8000;
app.listen(port, (err) => {
    err ? console.log(err) : console.log(`the server is running on ${port}`);
});