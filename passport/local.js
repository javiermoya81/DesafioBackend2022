const passport = require('passport')
const { Strategy } = require('passport-local')
const Users = require('../models/users.js')

const LocalStrategy = Strategy

passport.use('registro', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'passw',
    passReqToCallback: true
}, async(req, name, passw, done)=>{
    console.log(`registro name ${name}`);
    console.log(`registro Usuarios ${Users}`);
    const userDBreg = await Users.findOne({nombre: name})
    console.log(`registro ${userDBreg}`);
    if(userDBreg){
        return done(null, false)
    }
    const newUser = new Users()
    newUser.nombre = name;
    newUser.contraseña = passw;
    await newUser.save()
    done(null, newUser)
}))

passport.use('login', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'passw',
    passReqToCallback: true
}, async(req, name, passw, done)=>{
    const userDB = await Users.findOne({nombre: name})
    console.log(`login name ${userDB}`);
    if(!userDB){
        return done(null, false)
    }
    done(null, userDB)
}))

passport.serializeUser((usuario, done)=>{
    done(null, usuario.id)
})

passport.deserializeUser(async(id, done)=>{
    const usuario = await Users.findById(id)
    done(null, usuario)
})