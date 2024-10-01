const fs = require('fs');
const path = require('path');


//writing into files
//same dir. Creates a new  file starter.txt
fs.writeFile(path.join(__dirname, 'Starter.txt'), 'I have overwritten ', (err, data) =>{
    if(err) throw err
    console.log("File was successfully written");

});


//in different directory(files)

fs.writeFile(path.join(__dirname, 'files', 'LoremNew.txt'), 'I have overwritten ', (err, data) =>{
    if(err) throw err
    console.log("File was successfully written");
});

//Add more content to a file
//avoid overwritting data
//appendFile - asynchronously appends data to a file and
//creates the file if it does not exist

fs.appendFile(path.join(__dirname, 'files', 'LoremNew.txt'), '\nI have some new data ', (err, data) =>{
    if(err) throw err
    console.log("File was successfully written");
});



//using callbacks we can combine functions 
// we could write into a file
// return a callback function that appends data then
// return a callback function that renames the file
fs.writeFile(path.join(__dirname, 'files', 'LoremNewNew.txt'), "I have been overwritten 🚀🚀", (err, data) => {
    if (err) throw err
    console.log(`File was successfully written`);

    // after success writing append data
    fs.appendFile(path.join(__dirname, 'files', 'LoremNewNew.txt'), "\nI have some new data 😐 ", (err, data) => {
        if (err) throw err
        console.log(`File was successfully appended`);

        //after successfully append we can rename  
        fs.rename(path.join(__dirname, 'files', 'LoremNewNew.txt'), path.join(__dirname, 'files', 'loremRenamed.txt'), (err, data) => {
            if (err) throw err
            console.log(`File was successfully renamed`);
        })
    })
})

