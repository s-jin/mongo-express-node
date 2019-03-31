var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat-app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
   name:String,
   age: Number,
   temprament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//   name:"Ginger",
//   age: 4,
//   temprament: "Playful"
// });

// george.save(function(err, cat){
//     if(!err){
//         console.log("we just saved");
//         console.log(cat);
//     }
    
// });

Cat.create({
    name:"Snow White",
    age: 15,
    temprament: "Bland"
}, function(err, cat){
    if(!err){
        console.log(cat);
    }
});



Cat.find({}, function(err, cats){
   if(!err) {
       console.log(cats);
   }
});