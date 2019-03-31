var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found!");
                res.redirect("back");
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You are not the owner of this campground!!");
                    res.redirect("back");
                }
                
            }
        });
    }else{
        req.flash("error", "You need to be logged In!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Your Comment not found!");
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You are not the owner of this comment!!");
                    res.redirect("back");
                }
                
            }
        });
    }else{
        req.flash("error", "You need to be logged In!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged In!");
    res.redirect("/login");
};

module.exports = middlewareObj;