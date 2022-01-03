require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors')

const app = express();



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors({
    origin : "http://localhost:3000",
    methods : "GET, POST, PUT, DELETE",
    credentials : true,
}));
app.use(session({
    secret : "Little Secret",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/dodyDB");




const userSchema = new mongoose.Schema ({
    firstName : String,
    lastName : String,
    username : String,
    phone : Number,
    password : String,
    googleId : String,
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

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

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/hello');
  });

app.route("/signup")
    // .post((req,res) => {
        // const newUser = new User({
        //     firstName : req.body.firstName,
        //     lastName : req.body.lastName,
        //     email : req.body.email,
        //     phone : req.body.phone,
        //     password : req.body.pass
        // })
    //     newUser.save((err) => {
    //         if(!err) {
    //             res.send({
    //                 msg : "user added successfully"
    //             })
    //         }
    //     })
    // })
    .get((req, res) => {
        User.find()
          .then((contacts) => res.send(contacts))
          .catch((err) => res.send(err));
      })
    // .post((req,res) => {

    //     const newUser = new User({
    //         firstName : req.body.firstName,
    //         lastName : req.body.lastName,
    //         username : req.body.email,
    //         phone : req.body.phone,
    //     })
        
    //     User.register(newUser , req.body.pass, (err,user) => {
    //         if(err) {
    //             console.log(err)
    //             res.redirect("/register")
    //         }else {
    //             passport.authenticate("local")(req,res,function(){
    //                 res.redirect("/secrets")
    //             })
    //         }
    //     })
    // })
    .post(function (req, res, next) {
        const newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            username : req.body.username,
            phone : req.body.phone,
        })
        User.register(newUser, req.body.password, function (err, user) {
            if (err) {
                res.redirect("/signup")
            }
    
            // go to the next middleware
            next();
    
        });
    }, passport.authenticate('local', { successRedirect: '/hello', failureRedirect: '/loginFailure' }));


app.route("/login")
.post((req,res) => {
    const newUser = new User({
        username : req.body.username,
        password : req.body.password
    })

    req.login(newUser,(err) => {
        if(!err) {
            passport.authenticate("local")(req,res,function(){
            res.redirect("/hello")
            })
        }
    })
})

    app.route("/test")
    .get((req, res) => {
        if(req.isAuthenticated()) {
            res.send({msg : "auth"})
        } else {
            res.send({msg : "Notauth"})
        }
        User.find()
          .then((contacts) => res.send(contacts))
          .catch((err) => res.send(err));
      });
      app.route("/logout")
    .post((req,res) => {
        req.logout()
        res.redirect("/login")
    })


app.listen(8000, () => {
    console.log("Connected On Port 8000")
})