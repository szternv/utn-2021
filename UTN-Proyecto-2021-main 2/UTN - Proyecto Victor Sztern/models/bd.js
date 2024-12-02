var mysql = require('mysql');
var util = require('util');
var express = require('express');

var pool  = mysql.createPool({
    connectionLimit:10,
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    passwod:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DB_NAME,
  });

  pool.query = util.promisify(pool.query);

    if(pool != undefined){
      console.log("conectado");
    }
  
  module.exports = pool;