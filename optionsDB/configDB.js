
const optionsDB = {
    mariaDB:{
        client: 'mysql',
        connection:{
            host:'127.0.0.1',
            user:'root',
            password:'qamf@43996752',
            database:"ecommerce",
        }
    },
    sqlite:{
        client:"sqlite3",
        connection:{
            filename:"../DB/ecommerceDB.sqlite"
        },
        useNullAsDefault: true
    }
}
module.exports = {optionsDB}