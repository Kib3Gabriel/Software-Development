// // // console.log(process);

// // //key process of process
// // // process.env

// // // console.log(process.env.DB_NAME);   //undefined

// // // process.argv
// // // provides array of command line args passed when node js process is launched
// // console.log(process.argv[1]);


// //BeforeExit
// //BeforeExit event is emitted when Node.js empities its event loop and has no
// //additional work to schedule.Normally, the Node.js process will exit when 
// //there is no work scheduled, but a listener registered on the 'beforeExit' 
// //event can make asynchronous calls, and thereby cause the Node.js process to continue.
// // should not be  used as an alternative to the 'exit' event unless the intention is 
// // to schedule additional work.

// const process = require('node:process');
// process.on('beforeExit', (code) =>{
//     // code = 1
//     console.log('Process beforeExit event with code:' , code);
// });

// process.on('exit', (code) =>{
//     // code=2
//     console.log('Process exit event with code:', code);
// });

// console.log('This message is didplayed first');


// //Event:'exit'
// // The 'exit' event is emitted when the Node.js process is about to exit as a result of either:
// //    1.The process.exit() method being called explicitly;
// //    2.The Node.js event loop no longer having any additional work to perform.

// const process2 = require('node:process');
// process2.on('exit', (code) =>{
//     console.log(`About to exit with code: ${code}`);
// });


// // Listener functions must only perform ASYNCHRONOUS operations. 
// // The Node.js process will exit immediately after calling the 'exit'
// // event listeners causing any additional work still queued in the event 
// // loop to be abandoned. In the following example, for instance, the timeout 
// // will never occur:
// const process3 = require('node:process');
// process3.on('exit', (code) =>{
//     console.log('This will be executed');
//     setTimeout(() =>{
//         console.log('This will not run!!!', code);
//     }, 1000);
// });


// // Event:warning

// //The 'warning' event is emitted whenever Node.js emits a process warning.
// // Process warning is similar to an error(Exceptional conditions that are brought
// // to user's attention)
// // key properties of the warning = name, message, stack
// const process4 = require('node:process');
// process4.on('warning', (warning) =>{
//     console.log(warning.name);      //print the warning name
//     console.log(warning.message);   //print the warning message
//     console.log(warning.stack);     //print the track trace
// })




//process.argv
// returns an array containing the command-line arguments passed
// when the Node.js process was launched.

//console.log(process.argv[0]);

const {argv} = require('node:process');
argv.forEach((val, index) =>{
    console.log(`${index}: ${val}`);
})

