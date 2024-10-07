// EventEmmitters

//1.creat an emitter object
const EventEmmitter = require('events')
const myEmitter = new EventEmmitter()

// or
// creat  a class that extends an event emmiter

class Logger extends EventEmmitter(){};
const logger = new Logger()

//2.Emmit an event
// Use instanceofemmiter.emit()

myEmitter.emit('emit-name')
logger.emit('my-event',arg1,arg2)           //passing arguments down to the listener


// 3.listen to the event
//on() and once() used to listen to the events
myEmitter.on('emit-name', function(){})
logger.once('my-event', function(arg1, arg2){});


myEmitter.on('emit-name', function LipaNaPayBill(){} )
myEmitter.on('emit-name', function LipaNaPochi(){} )




// Ticket purchasing system
// Once a tickte is bought:
    // update the ticket supply
    // notify user via email
    // save the DB transactins
    //Using event emmiters to supply SOC-separation of conserns


    // set up aTicket manager
    