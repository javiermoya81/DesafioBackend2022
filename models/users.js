const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    contraseña: String
})

module.exports = mongoose.model('users', usuarioSchema)