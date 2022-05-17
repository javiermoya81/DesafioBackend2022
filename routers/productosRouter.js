const express = require('express')

const productosRouter = express.Router()

const productos = [];

// ruta que devuelve todos los productos
productosRouter.get('/productos',(req,res)=>{
    const tagline = 'Lista de Productos'
    res.render('products', {listaProductos:productos})
})

//ruta agrega un nuevo producto
productosRouter.post('/productos', (req, res)=>{
    const nuevoProducto = req.body
    nuevoProducto.price = parseInt(nuevoProducto.price)
    if(productos.length === 0) {
        nuevoProducto.id = productos.length+1
    }else{
        const ultimoProducto = productos[productos.length-1]
        nuevoProducto.id = ultimoProducto.id+1
    }
    productos.push(nuevoProducto)

    res.redirect('/')
})

module.exports=productosRouter