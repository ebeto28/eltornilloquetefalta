
const express = require('express');
const router = express.Router();
const connection = require('../database');

const bodyParser = require('body-parser');

module.exports = router;

router.use(bodyParser.json());


router.get('/', (req, res) => {
    res.send('hello word')
});

router.get('/listarProducto', (req, res) => {
    const sql = 'SELECT * FROM producto where estado="A"';
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay nada')
        }
    })
});


router.use(express.static('public'));
