var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware/index");

router.get("/", function(req, res){
   res.render("landing");
});

//show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register",function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
            //console.log(err.message);
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Welcome " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handles login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login",
        failureFlash: true
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res) {
   req.logout() ;
   req.flash("success", "You are logged out!");
   res.redirect("/campgrounds");
});


module.exports = router;