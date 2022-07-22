const mongoose = require('mongoose')


mongoose.connect(
    'mongodb+srv://javiercoder:javieradmin@cluster0.waohv.mongodb.net/passportMongo?retryWrites=true&w=majority'
)
.then(response=>console.log('Conectado a base de dato passportMongo'))
.catch(err=>console.log(err))