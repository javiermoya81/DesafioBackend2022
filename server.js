
const express = require('express')
const productosRouter = require('./routers/productosRouter')

const server = express()

server.set('view engine', 'ejs')

server.use(express.json())
server.use(express.urlencoded({extended:true}))


server.get('/', (req, res)=>{
    res.render('pages/form')
})

server.use('/', productosRouter);

const port = 8080
server.listen(port, ()=>{
    console.log(`Servidor conectado al puerto ${port}`)
})
server.on("error",error=>console.log(`Se produjo error de servidor ${error}`))

