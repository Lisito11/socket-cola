const lblNuevoTicket  = document.querySelector('#lblNuevoTicket');
const btnCreate  = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    btnCreate.disabled = false;
});

socket.on('disconnect', () => {
    btnCreate.disabled = true;
});

socket.on('last-ticket', (payload) => {
    lblNuevoTicket.innerText = `Ticker ${payload}`;
});


btnCreate.addEventListener( 'click', () => {

    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});