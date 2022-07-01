
const knex = require('knex')

class Contenedor{
    constructor(options, table){
        this.knex = knex(options)
        this.table = table
    }

    async save(elemento){
        try {
            const exist = await this.knex.schema.hasTable(this.table)
            if(exist){
                const nuevoElemento = await this.knex(this.table).insert(elemento)
                return nuevoElemento
            }
            else if(this.table == 'productos'){
                await this.knex.schema.createTable('productos',(table)=>{
                    table.increments('id').primary().unique()
                    table.string('title',50).notNullable()
                    table.float('price').notNullable()
                    table.string('image',200)
                });
                const nuevoElemento = await this.knex(this.table).insert(elemento)
                return nuevoElemento
            } else{
                await this.knex.schema.createTable('mensajes',(table)=>{
                    table.increments('id').primary().unique()
                    table.string('email',30).notNullable()
                    table.string('mensaje',400).notNullable()
                });
                const nuevoElemento = await this.knex(this.table).insert(elemento)
                return nuevoElemento
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
            const elemento = await this.knex.from(this.table).select("*").where("id",id)
            return elemento
            }
            else{
                return ({"mensaje":"Id no encontrado"})
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
            const elemento = await this.knex.from(this.table).select("*")
            return elemento
            }
        } 
        catch (error) {
            console.error('Se produjo un error:', error)
        }
    }
}

module.exports = Contenedor