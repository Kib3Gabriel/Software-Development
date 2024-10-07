// Q13 A JavaScript function to retrieve all the names of an object's own and inherited properties.

function getAllPropertyNames(obj) {
    let properties = new Set();

    do {
       Object.getOwnPropertyNames(obj).forEach(prop => properties.add(prop));
    
    } while (obj = Object.getPrototypeOf(obj));

    return [...properties];
}
const obj = { name: "John", age: 30 };  // Define an object with two properties
Object.prototype.gender = "Male";       // Add an inherited property via the prototype

console.log(getAllPropertyNames(obj));
