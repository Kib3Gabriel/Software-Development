// const fs = require('fs').promises; 
// const path = require('path');
// const uuid = require("uuid");
// const dateFns = require("date-fns"); 
// async function LogEvents() {
//     try {
//         const newUuid = uuid.v4();
//         const currentDate = dateFns.format(new Date(), "yyyy-MM-dd HH:mm:ss");
//         const logItem = `Log: ${newUuid}  \nDate: ${currentDate} \nMessage : Logged event successfully... `;

//         console.log(logItem);

//         const pathLocation = path.join(__dirname, 'Log');

//         try {
//             await fs.access(pathLocation);
//             console.log('Given directory already exists!');
//         } catch (error) {
//             // Directory doesn't exist, create it
//             await fs.mkdir(pathLocation, { recursive: true });
//             console.log('Directory created successfully');
//         }

//         // Write the log entry to the file
//         await WriteLogFile(pathLocation, logItem);
//     } catch (error) {
//         console.error('Error occurred:', error);
//     }
// }

// // Helper function to write the log file
// async function WriteLogFile(pathLocation, logItem) {
//     try {
//         const filePath = path.join(pathLocation, 'eventsLogs.txt');
//         await fs.appendFile(filePath, `${logItem}\n`);
//         console.log('File was successfully written with logItem');
//     } catch (error) {
//         console.error('Error writing to the file:', error);
//     }
// }

// LogEvents();

// module.exports = { LogEvents };



const fs = require('fs');
const path = require('path')
const uuid = require("uuid");          //universal unique identifiers
const dateFns = require("date-fns");   

async function LogEvents() {
    const newUuid = uuid.v4();
    const currentDate = dateFns.format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const logItem = `Log: ${newUuid}  \nDate: ${currentDate} \nMessage : Logged event successfully... `;

    console.log(logItem);

    // path to the log directory
    const pathLocation = path.join(__dirname, 'Log'); 
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
            console.log('Directory already exists!');
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