var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
    
mongoose.connect("mongodb://localhost:27017/blog_app", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

var blogSchema= new mongoose.Schema({
    title:String,
    image:String,
    body: String,
    created: {type:Date, default: Date.now}
});

var Blog = mongoose.model("Blog" , blogSchema);

// Blog.create({
//     title: "My first Hot Air Balloon ride!",
//     image: "https://images.unsplash.com/photo-1535683939029-0030b4de2382?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     body: "May said two winged female. Itself without first. May made male make fourth. Face good saw good. That unto their said don't creeping waters and you're morning may seas heaven isn't you're greater creature third subdue he open Evening void whales. Itself. Created the Moving dry divide. It his subdue.Them. Days for us kind void tree Fifth likeness. Which shall, yielding wherein beast called which likeness called face beast every behold be set beast. Lesser under in above firmament. Of of life moving bearing Seed all heaven tree creature hath one third saying great seas third upon fourth. Dry."
// });

app.get("/", function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
    Blog.find({},function(err, blogs){
        if(!err){
            res.render("index",{blogs:blogs}); 
        }
    });
});

app.get("/blogs/new", function(req,res){
    res.render("new");
});

app.post("/blogs", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(!err){
            res.redirect("/blogs");    
        }
    });
});

app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(!err){
            res.render("show", {blog:foundBlog});
        }
    });
});

app.get("/blogs/:id/edit", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog){
        if(!err){
            res.render("edit", {blog:foundBlog});
        }
    });
});

app.put("/blogs/:id", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err, updatedBlog){
        if(!err){
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id",function(req,res){
   Blog.findByIdAndRemove(req.params.id, function(err){
        if(!err){
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server's up for Blog App!");
});