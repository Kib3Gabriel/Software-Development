// fs module provides an API for interacting with the file system,
// like reading or writing files

const fs = require('fs');
console.log('Starting operation.....');


// fs.readFile reads the content of data.txt asynchronously(operation is
// non-blocking), allowing  other code to run while the file is being read
fs.readFile('data.txt', (err,  data) =>{
    if(err){
        console.log('Error reading file', err);
    }
    else{
        console.log('File data', data.toString());  //toString converts the data into a readable format
    }
});

console.log('Doing other stuffs...........');




