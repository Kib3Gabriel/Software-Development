const EventEmmitter = require('events')          //Note EventEmmitter should not be inside a curly brackets 
class TicketManager extends EventEmmitter {
    constructor(supply){
        this.supply = supply
    }

    // create methods
    buy(email, price){
        if(this.supply >0){
            this.supply--
            this.email("buy", email, price, Date.now())
        }
    }
    x
}

module.exports = TicketManager