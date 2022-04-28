
const Contenedor = require('./Contenedor')
const express = require('express')

const contenedor = new Contenedor('./productos.txt')

const server = express()
const port = 8080

server.listen(port, ()=>{
    console.log(`Servidor conectado al puerto ${port}`)
})
server.on("error",error=>console.log(`Se produjo error de servidor ${error}`))

// Endpoints
server.get('/',(req,res)=>{
    res.send('<h1>Desafío servidor con express</h1>')
})

server.get('/productos', async(req,res)=>{
    const listaProductos = await contenedor.getAll()
    res.json(listaProductos)
})

server.get('/productoRandom',async(req,res)=>{
    const listaProductos = await contenedor.getAll()
    const idRandom = Math.round((Math.random()*(listaProductos.length-1))+1);
    const productoRandom = await contenedor.getById(idRandom)
    res.json(productoRandom)
})

