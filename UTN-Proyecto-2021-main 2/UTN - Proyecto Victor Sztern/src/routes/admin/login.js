var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../../models/usuariosModel')
var whatever = require('./../../../models/bd');

router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});
var mysql = require('mysql');

var util = require('util');

var pool  = mysql.createPool({
    connectionLimit:10,
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    passwod:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DB_NAME,
  });

  pool.query = util.promisify(pool.query);

router.post('/', async (req, res, next) => {
    try {
        var user = req.body.usuario;
        var password = req.body.password;

        console.log(req.body);

        var data = await usuariosModel.getUserAndPassword(user, password);

        if (data != undefined) {
            req.session.id_user = data.id;
            req.session.nombre = data.user;
            res.redirect('/home');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }


}); +

console.log(typeof user);


module.exports = router;