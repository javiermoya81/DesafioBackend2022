const express = require('express')

const productosRouter = express.Router()

const productos = [];

const findId = (id,resp) =>{
    const producto = productos.find(element => element.id === id)
    if (!producto){
        resp.send({"Error": "Producto no encontrado"})
        return
    }
    return producto}

// ruta que devuelve todos los productos
productosRouter.get('/',(req,res)=>{
    res.json({productos:productos})
})

// ruta que devuelve un producto por id
productosRouter.get('/:id',(req,res)=>{
    const idProducto = parseInt(req.params.id)
    const producto = findId(idProducto, res)
    res.json(producto)
})

//ruta agrega un nuevo producto
productosRouter.post('/', (req, res)=>{
    const nuevoProducto = req.body
    nuevoProducto.price = parseInt(nuevoProducto.price)
    if(productos.length === 0) {
        nuevoProducto.id = productos.length+1
    }else{
        const ultimoProducto = productos[productos.length-1]
        nuevoProducto.id = ultimoProducto.id+1
    }
    productos.push(nuevoProducto)

    res.send({
        mensaje: ' producto nuevo agregado',
        producto:{
            ...nuevoProducto
        }
    })
})

//ruta actualiza un producto por id
productosRouter.put('/:id',(req,res)=>{
    const idProducto = parseInt(req.params.id)
    const producto = findId(idProducto, res)
    const productoModificado = req.body

    if(producto.title != productoModificado.title) producto.title = productoModificado.title
    if(producto.price != productoModificado.price) producto.price = productoModificado.price

    res.json(producto)
})

//ruta elimina un producto por id
productosRouter.delete('/:id',(req,res)=>{
    const idProducto = parseInt(req.params.id)
    const producto = findId(idProducto,res)
    const indiceProducto = productos.indexOf(producto);
    productos.splice(indiceProducto,1)
    res.send('Producto eliminado')
    
})
module.exports=productosRouter