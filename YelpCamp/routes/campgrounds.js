var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware/index");

//show all campgrounds
router.get("/", function(req,res){
    Campground.find({},function(err, dbcampGround){
       if(err){
           console.log(err);
       } else{
          res.render("campgrounds/index", {campGrounds:dbcampGround, currentUser:req.user});
       }
    });
});

//new campground form
router.get("/new", middleware.isLoggedIn, function(req,res){
   res.render("campgrounds/new");
});

//add campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.newCamp;
    var price = req.body.price;
    var img = req.body.newImg;
    var desc = req.body.newDesc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name, price: price, image: img, description: desc, author:author};
    
    Campground.create(newCampground, function(err, newlyAdded){
       if(err) {
           console.log(err);
       }else {
            req.flash("success", "Campground Added!");
            res.redirect("/campgrounds") ; 
       }
    });
    // campGrounds.push(newCampground);
});

//show one campground details
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err) {
           console.log(err);
       }else {
          res.render("campgrounds/show",{campground : foundCampground}); 
       }
    });
});

//edit campground 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/edit", {campground:foundCampground});
        }
    });
});

//update campground in DB
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    // req.body.campground.body = req.sanitize(req.body.campground.body);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Campground Edited!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destroy campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Campground Deleted!");
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;