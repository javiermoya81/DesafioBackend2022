
const express = require('express');
const {Server: ioServer} = require('socket.io')
const http = require('http')
const productosRouter = require('./routers/productosRouter');
const handlebars = require('express-handlebars');

const server = express()
const httpServer = http.createServer(server)
const io = new ioServer(httpServer)

server.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutDir: __dirname + "public/views/layouts",
        partialsDir: __dirname + "/public/views/partials/"
    })
)

server.use(express.static(__dirname + '/public'));
server.set('view engine', 'hbs')
server.set('views', "./public/views/")
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/', productosRouter);


const mensajesChats = [];

io.on('connection',(socket)=>{
    console.log(`Cliente conectado: ${socket.id}`)
    io.sockets.emit('mensajes', mensajesChats);
    
    socket.on('mensajeUsuario',data => {
        mensajesChats.push(data);
        io.sockets.emit('mensajes', mensajesChats);
    })
})


const port = 8080
httpServer.listen(port, ()=>{
    console.log(`Servidor conectado al puerto ${port}`)
})
httpServer.on("error",error=>console.log(`Se produjo error de servidor ${error}`))



