var express = require('express');
var router = express.Router();
var connection = require('../../../models/bd');

router.get('/', function (req, res, next) {

    connection.query('SELECT * FROM novedades', function (err, rows) {

        if (err) {
            res.status(404).send(JSON.stringify(err));
        } else {
            res.send(JSON.stringify(rows));
        }

    });

});

router.put('/', function (req, res, next) {
    let id = req.body.id
    let titulo = req.body.titulo
    connection.query('SELECT * FROM novedades', function (err, rows) {

        if (err) {
            res.status(404).send(JSON.stringify(err));
        } else {
            res.send(JSON.stringify(rows));
        }

    });

});


router.post('/', function (req, res, next) {
    let titulo = req.body.titulo
    let subtitulo = req.body.subtitulo
    let cuerpo = req.body.cuerpo
    connection.query(`INSERT INTO novedades (titulo, subtitulo, cuerpo) values ("${titulo}", "${subtitulo}", "${cuerpo}")`, function (err, rows) {

        if (err) {
            res.status(404).send(JSON.stringify(err));
        } else {
            res.status(200).send(JSON.stringify(rows));
        }

    });

});


router.delete('/', function (req, res, next) {
    connection.query(`DELETE FROM novedades WHERE id = ${req.body.id}`, function (err) {
        if (err) {
            res.status(404).send(JSON.stringify(err));
        } else {
            res.status(200).send({});
        }

    }

    )

});


module.exports = router;