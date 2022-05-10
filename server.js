
const express = require('express')
const productosRouter = require('./routers/productosRouter')

const server = express()
const port = 8080

server.use('/', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.get('/', (req, res)=>{
    res.send("Desafío router")
})

server.use('/api/productos', productosRouter);


server.listen(port, ()=>{
    console.log(`Servidor conectado al puerto ${port}`)
})
server.on("error",error=>console.log(`Se produjo error de servidor ${error}`))



