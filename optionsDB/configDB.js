
const optionsDB = {
    mariaDB:{
        client: 'mysql2',
        connection:{
            host:'127.0.0.1',
            user:'root',
            password:'javier29030508',
            database:"ecommerce",
        }
    },
    /*sqlite:{
        client:"sqlite3",
        connection:{
            filename:"../DB/ecommerceDB.sqlite"
        },
        useNullAsDefault: true
    }*/
}
module.exports = {optionsDB}