// const fs = require('fs');
// const path = require('path')


// process.on('uncaughtException', err) =>{
//     console.log(`There was an uncaught error ${err}`);
// }


const fs =require('fsPromises')







const fileOps = asyc() => {
    try {
        const data =await fsPromie.readFile(path.join(__dirname, 'files', 'starter.txt'), {encoding:'utf8'});
    } catch (error) {
        
    }
};