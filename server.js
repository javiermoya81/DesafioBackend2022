
const express = require('express');
const {Server: ioServer} = require('socket.io')
const http = require('http')
const handlebars = require('express-handlebars');
const Contenedor = require('./contenedor')
const {optionsDB} = require('./optionsDB/configDB')
const {faker} = require('@faker-js/faker')
const session = require('express-session');
const { log } = require('console');

const server = express()
const httpServer = http.createServer(server)
const io = new ioServer(httpServer)

const apiContenedorSql = new Contenedor(optionsDB.sqlite,"mensajes")
const apiContenedorMDB = new Contenedor(optionsDB.mariaDB,"productos")


server.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutDir: __dirname + "public/views/layouts",
        partialsDir: __dirname + "/public/views/partials/"
    })
)

server.set('view engine', 'hbs')
server.set('views', "./public/views/")

server.use(express.static(__dirname + '/public'));
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(session({
    secret: 'coder',
    resave: true,
    saveUninitialized: true
}))


server.get('/',(req, res)=>{
    res.render('login')
})

server.post('/session',(req, res)=>{
    const key = Object.keys(req.body)[0]
    const name = req.body[key]
    req.session[key] = name
    res.redirect('/index')
})

server.get('/index', async (req,res)=>{
    const productos = await apiContenedorMDB.getAll()
    const userName = req.session.name
    res.render('main', {listaProductos:productos, name:userName})
})

server.get('/logout', (req,res,next)=>{
    req.session.destroy(err =>{
        if(!err) res.redirect('/')
        else res.send('Error al desloguearse')
    })
})


server.get('/api/productos-test',(req,res)=>{
    const arrayFaker = []
    for(i=0; i<5; i++){
        const prodFaker = {
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            img: faker.image.business()
        }
        arrayFaker.push(prodFaker)
    }
    res.render('prodFaker',{listaProductos:arrayFaker})
})


io.on('connection',async (socket)=>{
    
    console.log(`Cliente conectado: ${socket.id}`)

    const mensajesChats = await apiContenedorSql.getAll();
    io.sockets.emit('mensajes', mensajesChats);

    socket.on('mensajeUsuario', async (data) => {
        await apiContenedorSql.save(data);
        const mensajesChats = await apiContenedorSql.getAll();
        io.sockets.emit('mensajes', mensajesChats);
    })

    socket.on('nuevoProducto', async (data) => {
        await apiContenedorMDB.save(data);
        const productos = await apiContenedorMDB.getAll();
        io.sockets.emit('productos', productos);
    })
})

const port = 8080
httpServer.listen(port, ()=>{
    console.log(`Servidor conectado al puerto ${port}`)
})
httpServer.on("error",error=>console.log(`Se produjo error de servidor ${error}`))



