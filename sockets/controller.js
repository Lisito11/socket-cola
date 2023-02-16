const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('status-currently', ticketControl.lastFour);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);


    
    socket.on('next-ticket', ( payload, callback ) => {

        const next = ticketControl.next();
        callback(next);

        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

    });

    socket.on('handle-ticket', ({escritorio}, callback) => {
        if (escritorio === null) {
            console.log('entro');
            return callback({
                ok: false,
                msg: 'Desktop is required'
            })
        }


        const ticket = ticketControl.handleTicket(escritorio);

        socket.broadcast.emit('status-currently', ticketControl.lastFour);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);


        if ( !ticket ) {
            return callback({
                ok: false,
                msg: 'There are not tickets'
            })
        } else {
            return callback({
                ok: true,
                ticket
            })
        }



    })

}



module.exports = {
    socketController
}

