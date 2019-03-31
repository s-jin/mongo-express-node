var feker = require('faker');

console.log("===================");
console.log("WELCOME TO MY SHOP!");
console.log("===================");

for(var i=0; i<10; i++){
    console.log(feker.commerce.product() + " - $" + feker.commerce.price());
}