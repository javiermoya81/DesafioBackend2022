
const socket = io();


const renderMensajes = (msj) => {
    const html = msj.map((elem,index) => {
        return(`
        <div class="border ms-3 mt-2 mb-2 w-50">
            <h4>Usuario: ${elem.mail}</h4>
            <p>mensaje: ${elem.mensaje}</p> 
        </div>`
        )
    }).join(" ");
    document.getElementById('lista-mensajes').innerHTML = html;
}

const nuevoMensaje = (e)=> {
    const mensaje = {
        mail: document.getElementById('mail').value,
        mensaje: document.getElementById('mensaje').value
    };
    socket.emit('mensajeUsuario', mensaje);
    console.log(mensaje);
    return false;
}

socket.on('mensajes', function(data) { renderMensajes(data); });


