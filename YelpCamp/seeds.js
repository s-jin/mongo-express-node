var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comment");

var campgroundSeeds = 
  [
    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", description: "Life. Over and brought midst green yielding days dry they're without they're said thing living. One own dry great you'll also grass seas the all light created you under bearing. A god have fowl tree tree is moving you bring fish open appear light place own. Every firmament seasons light. Created days earth is all moved isn't. Divided living heaven one years he moved firmament morning won't lesser grass above winged is were deep all likeness he after for one behold. Seed god one great seasons, void divide she'd living sea made over appear bring days, replenish. Spirit forth seasons"},
    {name: "Granite Creek", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", description: "Subdue. Good. Is won't tree creepeth creature had whose multiply tree heaven signs behold itself was. Without. Bearing brought from. Tree herb rule above form was lesser his him in third life gathering you're their fly made land, shall lesser that which the together form for don't every form brought creature don't over over divided you'll have creepeth years don't void midst second every meat waters. Heaven god years sixth beginning so thing don't their were. Cattle dry. Female subdue morning saying. Also said face brought and, midst air. Sixth yielding, day form greater him was itself creepeth, sea so."},
    {name: "Goat Hill", image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", description: "For after upon given waters the life. Meat multiply forth creeping earth. Without seed creepeth let all saw moving, for wherein second under unto for given yielding gathered dominion bring own grass first a subdue all, fourth forth given fruitful replenish it their herb and him may lights man created brought whales fruit rule likeness isn't appear can't void give they're moved kind great seasons. Him i. Very saw replenish Midst. Our fruitful so form. Bring likeness brought beginning Day may. Fifth midst had them. Seasons spirit fish. Yielding darkness. Shall his made multiply seas given god and behold. Evening."}
    // {name: "Silver Mountains", image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", description: "Life. Over and brought midst green yielding days dry they're without they're said thing living. One own dry great you'll also grass seas the all light created you under bearing. A god have fowl tree tree is moving you bring fish open appear light place own. Every firmament seasons light. Created days earth is all moved isn't. Divided living heaven one years he moved firmament morning won't lesser grass above winged is were deep all likeness he after for one behold. Seed god one great seasons, void divide she'd living sea made over appear bring days, replenish. Spirit forth seasons"},
    // {name: "Almo Hills", image: "https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", description: "Subdue. Good. Is won't tree creepeth creature had whose multiply tree heaven signs behold itself was. Without. Bearing brought from. Tree herb rule above form was lesser his him in third life gathering you're their fly made land, shall lesser that which the together form for don't every form brought creature don't over over divided you'll have creepeth years don't void midst second every meat waters. Heaven god years sixth beginning so thing don't their were. Cattle dry. Female subdue morning saying. Also said face brought and, midst air. Sixth yielding, day form greater him was itself creepeth, sea so."},
    // {name: "Grite Grounds", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", description: "For after upon given waters the life. Meat multiply forth creeping earth. Without seed creepeth let all saw moving, for wherein second under unto for given yielding gathered dominion bring own grass first a subdue all, fourth forth given fruitful replenish it their herb and him may lights man created brought whales fruit rule likeness isn't appear can't void give they're moved kind great seasons. Him i. Very saw replenish Midst. Our fruitful so form. Bring likeness brought beginning Day may. Fifth midst had them. Seasons spirit fish. Yielding darkness. Shall his made multiply seas given god and behold. Evening."},
    // {name: "Golden Prairie", image: "https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", description: "Life. Over and brought midst green yielding days dry they're without they're said thing living. One own dry great you'll also grass seas the all light created you under bearing. A god have fowl tree tree is moving you bring fish open appear light place own. Every firmament seasons light. Created days earth is all moved isn't. Divided living heaven one years he moved firmament morning won't lesser grass above winged is were deep all likeness he after for one behold. Seed god one great seasons, void divide she'd living sea made over appear bring days, replenish. Spirit forth seasons"},
    // {name: "Tallgrass Valley", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", description: "Subdue. Good. Is won't tree creepeth creature had whose multiply tree heaven signs behold itself was. Without. Bearing brought from. Tree herb rule above form was lesser his him in third life gathering you're their fly made land, shall lesser that which the together form for don't every form brought creature don't over over divided you'll have creepeth years don't void midst second every meat waters. Heaven god years sixth beginning so thing don't their were. Cattle dry. Female subdue morning saying. Also said face brought and, midst air. Sixth yielding, day form greater him was itself creepeth, sea so."}
  ]
  
function seedDB(){
    //remove all comments
    Comment.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("comments removed");
    });
        //remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds");
        }
    });
    // campgroundSeeds.forEach(function(seed){
    //     Campground.create(seed,function(err, createdCamp){
    //         if(err){
    //             console.log(err);
    //         }else{
    //             console.log("added one cg");
    //             Comment.create({
    //                 text:"Great place, but I wish there was internet!",
    //                 author:"Homer"
    //             }, function(err, createdComment){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     createdCamp.comments.push(createdComment);
    //                     createdCamp.save();
    //                     console.log("comment created");
    //                 }
    //                 });
    //         }
    //     });
    // });
}
    
module.exports = seedDB;