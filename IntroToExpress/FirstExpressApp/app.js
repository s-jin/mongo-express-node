var express = require("express");
var app = express();

app.get("/", function(req, res){
   res.send("Hi there!");
});

app.get("/bye", function(req, res){
    res.send("Goodbye!!!");
});

app.get("/dog", function(req, res){
    console.log("ff");
    res.send("MEOW!!");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started.")
});