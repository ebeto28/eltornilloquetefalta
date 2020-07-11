const express = require('express');
const router = express.Router();
const connection = require('../database');

const bodyParser = require('body-parser');

module.exports = router;

router.use(bodyParser.json());


router.get('/', (req, res) => {
    res.send('hello word')
});

router.get('/listarStock', (req, res) => {
    const sql = 'SELECT * FROM stock where estado="A"';
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay nada')
        }
    })
});

router.get('/consultarStock/:id', (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM stock where id_Stock=${id}`;
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay nada')
        }
    })
});

router.post('/agregarStock', (req, res) => {
    const sql = 'INSERT INTO stock SET ?';
    const stock = {
        id_Stock: req.body.id_Stock,
        id_Producto: req.body.id_Producto,
        cantidad: req.body.cantidad,
        estado: "A"

    }
    connection.query(sql, stock, error => {
        if (error) throw error;
    })

    res.json(req.body)

});

router.put('/modificarStock/:id', (req, res) => {

    const { id } = req.params;
    const { id_Producto, cantidad } =
    req.body;

    const sql = `UPDATE stock SET cantidad = (cantidad) - ${cantidad} where id_Stock=${id} and id_Producto=${id_Producto}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send("Stock modificada");
    })


});

router.delete('/eliminarStock/:id', (req, res) => {
    const { id } = req.params;
    const { estado_Stock } =
    req.body;

    const sql = `UPDATE stock SET estado="I" where id_Stock=${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send("Stock eliminada");
    })

});

router.use(express.static('public'));