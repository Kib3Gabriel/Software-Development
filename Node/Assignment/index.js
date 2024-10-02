const EventListener = require('node:events');

const {LogEvents} = require('./LogEvents')

const myEmitter = new EventListener();

myEmitter.on('event', function LogEvents(){
    console.log('Add to the emitter');
});