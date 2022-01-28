const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3l0n_Musk@',
  port: '3306',
  database: 'tutorial'
});

module.exports = {

    findById: function (id){
        return connection.promise().query('select * from users where id=?', [id])
    },

    findByUsername: function (username){
        return connection.promise().query('select * from users where login=?', [username])
    }

}