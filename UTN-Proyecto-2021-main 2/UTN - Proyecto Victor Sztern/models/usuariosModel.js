var pool = require('./bd');
var md5 = require('md5');
var mysql = require('mysql');

var whatever  = mysql.createPool({
    connectionLimit:10,
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    passwod:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DB_NAME,
  });

async function getUserAndPassword(user, password) {
    try {
        var query = 'select * from user where user = ? and password = ? limit 1';
        var rows = await pool.query(query,[user,md5(password)]);
        console.log(user, password);
        return rows[0];

    } catch (error) {
        console.log(error)
    }
}



module.exports = { getUserAndPassword }