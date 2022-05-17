
const express = require('express');
const productosRouter = require('./routers/productosRouter');
const handlebars = require('express-handlebars');

const server = express()
const port = 8080

server.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials/"
    })
)

server.set('view engine', 'hbs')
server.set('views', "./views")
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.get('/', (req, res)=>{
    res.render('form')
})

server.use('/', productosRouter);


server.listen(port, ()=>{
    console.log(`Servidor conectado al puerto ${port}`)
})
server.on("error",error=>console.log(`Se produjo error de servidor ${error}`))



