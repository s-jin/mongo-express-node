
var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, Welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal;
    
    if(animal == "pig"){
        res.send("The " + animal + " says 'Oink'");
    }
    
    else if(animal == "cow"){
        res.send("The " + animal + " says 'Moo'");
    }
    
    else if(animal == "dog"){
        res.send("The " + animal + " says 'Woof Woof'");
    }
    
    else if(animal == "cat"){
        res.send("The " + animal + " says 'Meow'");
    }
    
});


app.get("/repeat/:word/:number", function(req,res){
   var str = req.params.word + " ";
   var n = Number(req.params.number);
   var ostr = str;
   
    for(var i = 1; i<n; i++){
         ostr += str;
   }
   res.send(ostr);
});

app.get("*", function(req, res) {
    res.send("Sorry, Page not found!");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started.")
});