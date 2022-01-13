const passport = require("passport");
const express = require("express");
const {
    login,
    signup,
    test,
    logout,
    addproperty,
    addbookeddates,
    properties,
    search,
  } = require("../controllers/controllers");

const Router = express.Router();

function usernameToLowerCase(req, res, next){
  req.body.username = req.body.username.toLowerCase();
  next();
}

Router
    // .get("/signup",(req, res) => {
    //     User.find()
    //       .then((contacts) => res.send(contacts))
    //       .catch((err) => res.send(err));
    //   })

    .post("/signup", usernameToLowerCase,signup, passport.authenticate('local', {failureRedirect: '/signup=failed' }),(req, res) => {
        if(req.body.hidden) {
            res.redirect("/");
        }else {
            res.redirect("/")
        }
      });


      
Router
    .post("/login",usernameToLowerCase,login)


    Router
    .get("/test",test);
    


      Router
    .post("/logout",logout);

    Router
       .post("/addproperty/:id",addproperty)

       Router
       .post("/addbookeddates/:id/:pid",addbookeddates)
        Router
           .get("/properties/:id/:pid",properties)
        Router
           .get("/search/:des/:checkin/:checkout",search)


module.exports = Router;