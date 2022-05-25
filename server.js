
const express = require('express');
const {Server: ioServer} = require('socket.io')
const http = require('http')

const server = express()
const httpServer = http.createServer(server)
const io = new ioServer(httpServer)

server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(express.static(__dirname+'/public'))

const listaProductos = [];

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado' + socket.id);

    socket.on('new-product',producto=>{
        listaProductos.push(producto)
        io.sockets.emit('new-list', listaProductos)
    })
});

const port = 8080
httpServer.listen(port, ()=>{
    console.log(`Servidor conectado al puerto ${port}`)
})
server.on("error",error=>console.log(`Se produjo error de servidor ${error}`))



