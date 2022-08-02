const express = require('express');
const {Server: ioServer} = require('socket.io')
const http = require('http')
const handlebars = require('express-handlebars');
const Contenedor = require('./contenedor')
const {optionsDB} = require('./optionsDB/configDB')
const {faker} = require('@faker-js/faker')
const session = require('express-session');
const { log } = require('console');
const MongoStore = require('connect-mongo')
const dbMongoAtlas = require('./DB/dbMongoAtlas')
const passportLocal = require('./passport/local.js')
const passport = require('passport')
const processObject = require('./proccesObject') 
const yargs = require('yargs')




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
//Desafio Inicio sesion
server.use(session({
    secret: 'coder',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:'mongodb+srv://javiercoder:javieradmin@cluster0.waohv.mongodb.net/sessionMongoAtlas?retryWrites=true&w=majority'})
}))
server.use(passport.initialize())
server.use(passport.session())

function isAuth(res, req, next){
    if(res.isAuthenticated()){
        next()
    }else{
        res.render('/login')
    }
}

/***********Rutas***********/

server.get('/',(req, res)=>{
    res.render('login')
})

server.get('/register',(req, res)=>{
    res.render('register')
})

server.post('/register',passport.authenticate('registro',{
    failureRedirect:'/errorRegister',
    successRedirect: '/'
}))
server.get('/errorRegister',(req,res)=>{
    res.render('errorRegister')
})

server.post('/login',passport.authenticate('login',{
    failureRedirect:'/errorLogin',
    successRedirect: '/index'
}))
server.get('/errorLogin',(req,res)=>{
    res.render('errorLogin')
})

server.get('/index',isAuth, (req,res)=>{
    console.log(`getIndex ${req.user.nombre}`);
    res.render('main', { name:req.user.nombre})
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

server.get('/info',(req,res)=>{

})

/*************Socket****************/
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


//**********Puerto**********/
const PORT = yargs.default({port:8080}).argv
httpServer.listen(PORT.port, ()=>{
    console.log(`Servidor conectado al puerto ${PORT.port}`)
})
httpServer.on("error",error=>console.log(`Se produjo error de servidor ${error}`))



