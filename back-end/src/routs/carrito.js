const express = require('express');
const router = express.Router();
const connection = require('../database');

const bodyParser = require('body-parser');

module.exports = router;

router.use(bodyParser.json());


router.get('/', (req, res) => {
    res.send('hello word')
});

router.get('/listarCarrito', (req, res) => {
    const sql = 'SELECT producto.id_Producto, carrito.id_Transaccion, producto.nombre, carrito.cantidad, producto.precio, carrito.cantidad*producto.precio as subtotal FROM carrito, producto where carrito.id_Producto=producto.Id_Producto && carrito.estado="A"';

    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay nada')
        }
    })
});
router.get('/listarTotal', (req, res) => {
    const sql = 'SELECT producto.id_Producto, carrito.id_Transaccion, sum(carrito.cantidad*producto.precio) as total FROM carrito, producto where carrito.id_Producto=producto.Id_Producto && carrito.estado="A" group by carrito.id_Transaccion;';

    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay nada')
        }
    })
});

router.get('/consultarCarrito/:id', (req, res) => {
    const { id } = req.params
    const sql = `SELECT * FROM carrito where id_Transaccion=${id}`;
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay nada')
        }
    })
});

router.post('/agregarCarrito', (req, res) => {
    const sql = 'INSERT INTO carrito SET ?';
    const carrito = {
        id_Cliente: req.body.id_Cliente,
        id_Producto: req.body.id_Producto,
        cantidad: req.body.cantidad,
        estado: "A"

    }
    connection.query(sql, carrito, error => {
        if (error) throw error;
    })

    res.json(req.body)

});

router.put('/modificarCarrito/:id', (req, res) => {

    const { id } = req.params;
    const { cantidad } =
    req.body;

    const sql = `UPDATE carrito SET cantidad='${cantidad}' where id_Transaccion=${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send("carrito modificado");
    })
});

router.delete('/eliminarCarrito/:id', (req, res) => {
    const { id } = req.params;
    const { estado } =
    req.body;

    const sql = `UPDATE carrito SET estado="I" where id_Transaccion=${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send("carrito eliminado");
    })

});

router.use(express.static('public'));