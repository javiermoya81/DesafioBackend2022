const express = require('express')
const Contenedor = require('../contenedor.js')
const {optionsDB} = require('../optionsDB/configDB.js')

const productosRouter = express.Router()

const apiContenedor = new Contenedor(optionsDB.mariaDB,"productos")

// ruta que devuelve todos los productos
productosRouter.get('/', async (req,res)=>{
    const productos = await apiContenedor.getAll()
    res.render('main', {listaProductos:productos})
})

//ruta agrega un nuevo producto
productosRouter.post('/productos', async (req, res)=>{
    const nuevoProducto = req.body
    console.log(nuevoProducto);
    nuevoProducto.price = parseInt(nuevoProducto.price)
    await apiContenedor.save(nuevoProducto)

    res.redirect('/')
})

module.exports=productosRouter