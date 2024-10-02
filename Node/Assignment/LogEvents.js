// const fs = require('fs');
// const path = require('path')
// const uuid = require("uuid");
// const dateFns = require("date-fns");

// async function LogEvents() {
//     const newUuid = uuid.v4();
//     const currentDate = dateFns.format(new Date(), "yyyy-MM-dd HH:mm:ss");
//     const logItem= `Log: ${newUuid}  \nDate: ${currentDate} \nMessage : Logged event successfully... `;

//     console.log(logItem);


//     const pathLocation = './new-Deirectory';
//     fs.access(pathLocation, (error) =>{
//         if(error){
//             fs.mkdir(pathLocation, (error) =>{
//                 if(error){
//                     console.log(error);
//                 }else{
//                     console.log('New directory created successfully');

//                 }
//             });
//         }else{
//             console.log('Given directory already exists!!');
//         }
//     })

//     fs.appendFile(path.join(__dirname, 'new-Directory','This file contains events logs only', 'eventLogs.txt'), (err, data) =>{
//         if(err) throw err
//         console.log("File was successfully written");
//     });

// }



// LogEvents()






//uuid package, is used to generate universally unique identifiers
const fs = require('fs');
const path = require('path')
const uuid = require("uuid");
const dateFns = require("date-fns");

async function LogEvents() {
    const newUuid = uuid.v4();
    const currentDate = dateFns.format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const logItem = `Log: ${newUuid}  \nDate: ${currentDate} \nMessage : Logged event successfully... `;

    console.log(logItem);

    // path to the log directory
    const pathLocation = path.join(__dirname, 'new-Directory'); 
    fs.access(pathLocation, (error) =>{
        if(error){
            //if directory doesn't exist, create it
            fs.mkdir(pathLocation, {recursive:true}, (error) =>{
                if (error){
                    console.log(error);
                } else {
                    console.log('Directory created successfully');
                    WriteLogFile();
                }
            });
        }else{
            console.log('Given directory already exists!');
            WriteLogFile();
        }
    });

    function WriteLogFile(){
        const filePath = path.join(pathLocation, 'eventsLogs.txt');

        fs.appendFile(filePath, `${logItem}\n`, (err) =>{
            if(err) throw err;
            console.log('File was successfully written with logItem');
        })
    }

}

LogEvents()

module.exports = {LogEvents}