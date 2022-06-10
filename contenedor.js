
const knex = require('knex')

class Contenedor{
    constructor(options, table){
        this.knex = knex(options)
        this.table = table

        
        console.log(' constructor');
    }

    async save(producto){
        try {
            console.log(this.knex + 'save');
            const exist = await this.knex.schema.hasTable(this.table)
            console.log(exist);
            if(exist){
                const nuevoProducto = await this.knex(this.table).insert(producto)
                return nuevoProducto
            }
            else{
                await this.knex.schema.createTable('productos',(table)=>{
                    table.increments('id').primary().unique()
                    table.string('title',50).notNullable()
                    table.float('price').notNullable()
                    table.string('image',200)
                });
                console.log('tabla creada');
            }
            
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }

    async getById(id){   
        try {
            const exist = await this.knex.schema.hasTable(this.table)
            if(exist){
            const producto = await this.knex.from(this.table).select("*").where("id",id)
            return producto
            }
            else{
                return ({mensaje:"No exiten productos cargados"})
            }
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }

    async getAll(){  
        try {
            const exist = await this.knex.schema.hasTable(this.table)
            if(exist){
            const listadoProductos = await this.knex.from(this.table).select("*")
            return listadoProductos
            }
            else{
                return ({mensaje:"No exiten productos cargados"})
            }
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }
}

module.exports = Contenedor