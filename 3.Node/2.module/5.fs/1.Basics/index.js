// //The node:fs module enables interacting with the file system in a way modeled on standard POSIX functions.
const fs = require("fs");
//imports * as fs from 'node:fs

//asynchronously read the entire contents of a file
//readfile returns a callback function
//The callback is passed two arguments (err, data), where data is the contents of the file.
//utf8 or toString(), converts the data into a readble format
fs.readFile("C:/Users/Kibe/OneDrive/Desktop/Teach2Give/week5Node/2.module/5.fs/starter.txt", 'utf8',(err, data) => {
    if (err) throw errclg;
    console.log(data);
  }
);
console.log("--------------------using tostring--------------------------");            //readingFile is asynchronous, so this line will be executed before the one above

fs.readFile("C:/Users/Kibe/OneDrive/Desktop/Teach2Give/week5Node/2.module/5.fs/starter.txt", (err, data) => {
    if (err) throw errclg;
    console.log(data.toString());
  }
);








//catching errors in file
// The process.on() method in Node.js is used to listen for specific events emitted 
// by the process object. This allows you to handle certain situations or signals 
// in your application, such as handling errors, managing shutdowns, responding to 
// interrupts, and more. It's essentially an event listener that reacts to various 
// events during the lifetime of a Node.js process.

const fs1 =require('fs');
process.on('uncaughtException', err =>{
    console.log(`There was an uncaught ${err}`);
    process.exit(1)
});
fs1.readFile("C:/Users/Kibe/OneDrive/Desktop/Teach2Give/week5Node/2.module/5.fs/starter.txt",(err,data) =>{
    if(err) throw err
    console.log(data.toString);
});