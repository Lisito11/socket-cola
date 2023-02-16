const lblEscritorio  = document.querySelector('h1');
const lblPendientes  = document.querySelector('#lblPendientes');
const btnAtender  = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Desktop required');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlert.style.display = 'none'

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('tickets-pendientes', (pendientes) => {
    if (pendientes === 0) {
        lblPendientes.style.display = 'none'
    } else {
        lblPendientes.style.display = ''
        lblPendientes.innerText = pendientes;
    }

});


btnAtender.addEventListener( 'click', () => {
    socket.emit('handle-ticket', {escritorio}, ( {ok, ticket, msg} ) => {
        if (!ok ) {
            lblTicket.innerText = `Nadie`
            divAlert.style.display='';
        }

        lblTicket.innerText = `Ticket ${ticket.number}`
        
    });

});