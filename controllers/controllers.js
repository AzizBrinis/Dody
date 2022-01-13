const User = require("../models/user");
const passport = require("passport");
const mongoose = require("mongoose");



exports.login = async (req,res) => {
    const newUser = new User({
        username : req.body.username.toLowerCase(),
        password : req.body.password,
        data : req.body.hidden
    })
    try {
    await req.login(newUser,(err) => {
        if(!err) {
            passport.authenticate("local", function(err, user, info) {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/login=failed'); }
                req.logIn(user, function(err) {
                  if (err) { return next(err); }
                    if(req.body.hidden) {
                        let id = req.body.hidden.split(" ")[0];
                        let pid = req.body.hidden.split(" ")[1];
                        res.redirect(`/properties/${id}/${pid}`);
                    }else {
                        res.redirect("/")
                    }
                });
              })
              (req,res)
            
        }
    })
    } catch (error) {
    console.log("login failed ", error);
    res.status(401);
  }
};

exports.signup = async (req, res, next) => {
    const newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.username.toLowerCase(),
        phone : req.body.phone,
        data : req.body.hidden,
    })
    try {
        await User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            res.redirect("/signup=failed")
        }

        next();

    })
} catch (error) {
    console.log("register failed ", error);
    res.status(401);
  }
  };


exports.test = async (req,res) => {
    if(req.isAuthenticated()) {
        res.send({msg : "auth"})
    } else {
        res.send({msg : "Notauth"})
    }
    try {
    await User.find()
    .then((contacts) => res.send(contacts))
    .catch((err) => res.send(err));
    
    } catch (error) {
    console.log("test failed ", error);
    res.status(401);
  }
};



exports.logout = async (req,res) => {
    try {
        await req.logout()
        res.redirect("/login")
    } catch (error){
        console.log("logout failed ", error);
        res.status(401);
    }  
};

exports.addproperty = async (req,res) => {
    let dates = []
    let photos = []
    if (req.body.BookedDates) {
        dates = req.body.BookedDates.split(" ")
    }
    if (req.body.photos) {
        photos = req.body.photos.split(" ")
    }
        
    try {
        await User.findOneAndUpdate({ _id : req.params.id },{
        $push : {
           properties :  {
            _id : req.params.id,
            id : Math.floor(Math.random() * 1000),
            title : req.body.title,
            address : req.body.address,
            addressSearch : req.body.address.split(", ").map(el => el = el.trim().toLowerCase()),
            price : req.body.price,
            description : req.body.description,
            host : req.body.host,
            location : { lat: Number(req.body.lat), lng: Number(req.body.lng) },
            photos : photos,
            hostPhoto : req.body.hostPhoto,
            BookedDates : dates
        }
         }
       },function(err) {
        if(!err) {
            
            res.send("ok")
        } else {
            res.send(err)
        }
    })
} catch (error) {
    console.log("adding property failed ", error);
    res.status(401);
  }
    
    
    
   };

exports.addbookeddates = async (req,res) => {
    let datesbook = []
    if (req.body.BookedDates) {
        datesbook = req.body.BookedDates.split(" ")
    }
    try {
    await User.findById(req.params.id,(err,foundUser) => {
        if(!err) {
            if(foundUser) {
                
                if (foundUser.properties.find(element => element.id == req.params.pid)) {
                    foundUser.properties.find(element => element.id == req.params.pid).BookedDates.push(...datesbook)
                    foundUser.markModified('properties') 
                    foundUser.save(() => {
                        res.send("succ")
                    })
                }
                }
            }
        }
    )
    } catch (error) {
        console.log("addbookeddates failed ", error);
        res.status(401);
    }};

exports.properties = async (req,res) => {
    try {
    User.findById(req.params.id,(err,foundUser) => {
        if(!err) {
            if(foundUser) {
                
                if (foundUser.properties.find(element => element.id == req.params.pid)) {
                    res.send(foundUser.properties.find(element => element.id == req.params.pid))
                    
                }
                }
            }
        }
    )
    }catch (error) {
        console.log("properties failed ", error);
        res.status(401);
    }
   }

exports.search = async (req,res) => {
    let t = [];
    let d =[];
    let des = req.params.des.split("=")[1];
    let checkin = req.params.checkin.split("=")[1];
    let checkout = req.params.checkout.split("=")[1];

    if(checkin && !checkout) {
         let result = new Date(checkin);
         result.setDate(result.getDate() + 1);
         checkout = result.toISOString().substring(0, 10);
    }
    if(!checkin && checkout) {
     let result = new Date(checkout);
     result.setDate(result.getDate() - 1);
     checkin = result.toISOString().substring(0, 10);
 }
 

    if(des == "all" && !checkin && !checkout ) {
    await User.find({},(err,data) => {
        data.map(el => {t = [...t,...el.properties]})
        res.send(t)
    })
 } else if (des == "all" && checkin && checkout) {
     let ckin = new Date(checkin);
     let ckout = new Date(checkout);
     await User.find({},(err,data) => {
         data.map(el => {
             el.properties.map(pr => {
                 let reserved = false;
                 for(let i=0;i<pr.BookedDates.length;i+=2){
                     let date1 = new Date(pr.BookedDates[i]);
                     let date2 = new Date(pr.BookedDates[i+1]);

                     if((ckin>=date1 && ckin<=date2) || (ckout>=date1 && ckout<=date2)) {
                         reserved = true;
                     }
                 }
                 if (!reserved) {
                     t.push(pr)
                 }
             })
         })
         res.send(t)
     })
 } else if (des != "all") {
     if (!checkin && !checkout) {
         await User.find({},(err,data) => {
             data.map(el => {
                 el.properties.map(pr => {
                     let match = false;
                     for(let i=0;i<3;i++){

                         if(pr.addressSearch[i] == des.trim().toLowerCase()) {
                             match = true;
                         }
                     }
                     if (match) {
                         t.push(pr)
                     }
                 })
             })
             res.send(t)
         })
     } else if (checkin && checkout) {
         let ckin = new Date(checkin);
         let ckout = new Date(checkout);
         await User.find({},(err,data) => {
             data.map(el => {
                 el.properties.map(pr => {
                     let match = false;
                     for(let i=0;i<3;i++){

                         if(pr.addressSearch[i] == des.trim().toLowerCase()) {
                             match = true;
                         }
                     }
                     if (match) {
                         d.push(pr)
                     }
                 })
             })
             d.map(pre => {
                 let reserved = false;
                 for(let j=0;j<pre.BookedDates.length;j+=2){
                     let date1 = new Date(pre.BookedDates[j]);
                     let date2 = new Date(pre.BookedDates[j+1]);

                     if((ckin>=date1 && ckin<=date2) || (ckout>=date1 && ckout<=date2)) {
                         reserved = true;
                     }
                 }
                 if (!reserved) {
                     t.push(pre)
                 }
             })
             res.send(t)
         })
     }
 }
}


// exports.login = async (req,res) => {

//     try {
//     await 

//     } catch (error) {
//     console.log("login failed ", error);
//     res.status(401);
//   }
// };

/******************************  Add contact ******************* */

// exports.addContact = async (req, res) => {
//   const newContact = new Contact({ ...req.body });

//   try {
//     await newContact.save();

//     res.status(201).json({ msg: "Contact added successfully" });
//   } catch (error) {
//     console.log("adding contact failed", error);

//     res.status(401).json({ msg: "Adding contact failed" });
//   }
// };

/********************************Get all Contacts ************************* */

// exports.getContacts = async (req, res) => {
//   const contacts = await Contact.find();

//   try {
//     res.status(202).json({ contacts });
//   } catch (error) {
//     console.log("get contacts failed", error);
//     res.status(402).json({ msg: "Fetch contacts failed" });
//   }
// };