
const { Console } = require('console');
const fs = require('fs')

class contenedor{
    constructor(file){
        this.file = file
    }

    async save(producto){
        try {
            const contenidoFileJson = await fs.promises.readFile(this.file, 'utf-8')
            let listadoProductos = JSON.parse(contenidoFileJson)
            if(listadoProductos.length === 0) {
                producto.id = listadoProductos.length+1
            }else{
                const ultimoProducto = listadoProductos[listadoProductos.length-1]
                producto.id = ultimoProducto.id+1
            }
            listadoProductos.push(producto)
            await fs.promises.writeFile(this.file, JSON.stringify(listadoProductos, null, 2))
            console.log(`Producto id:${producto.id} - Agregado`);
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }

    async getById(id){   
        try {
            const contenidoFileJson = await fs.promises.readFile(this.file, 'utf-8')
            let listadoProductos = JSON.parse(contenidoFileJson)
            let producto = listadoProductos.find(element => element.id === id);
            if(!producto) producto=null
            return producto
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }

    async getAll(){  
        try {
            const contenidoFileJson = await fs.promises.readFile(this.file, 'utf-8')
            let listadoProductos = JSON.parse(contenidoFileJson)
            return listadoProductos
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }

    async deleteById(id){   
        try {
            const contenidoFileJson = await fs.promises.readFile(this.file, 'utf-8')
            let listadoProductos = JSON.parse(contenidoFileJson)
            let producto = listadoProductos.find(element => element.id === id);
            let indiceProducto = listadoProductos.indexOf(producto);
            if(indiceProducto===-1) console.log('No existe el producto')
            else {
                listadoProductos.splice(indiceProducto,1)
                await fs.promises.writeFile('./productos.txt',JSON.stringify(listadoProductos, null, 2))
                console.log(`Producto id:${id} - eliminado`);
            }
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }

    async deleteAll(){ 
        try {
            await fs.promises.writeFile('./productos.txt','[]')
            console.log('Se eliminaron todos los productos');
            }
        catch (error) {
            console.error('Se produjo un error:', error)
        }   
    }
}

module.exports = contenedor