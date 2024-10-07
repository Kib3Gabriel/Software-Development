const myFunction = require('./math')

console.log(myFunction.add(10,11));
console.log(myFunction.sub(21,10));
console.log(myFunction.divide(21,3));


//use the functions that were exported directly 
const {add, sub} = require('./math');
console.log(add(7,3));
console.log(sub(20,3));
