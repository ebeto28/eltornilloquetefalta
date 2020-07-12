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
    const sql = 'SELECT * FROM producto, stock where  producto.estado="A"  and stock.id_Producto=producto.id_Producto and stock.cantidad>0';
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay nada')
        }
    })
});

router.get('/consultarProducto/:id', (req, res) => {
    const { id } = req.params
    const sql = `SELECT stock.id_Stock, producto.nombre, stock.cantidad, producto.id_Producto, categoria.id_Categoria, 
    categoria.descripcion, producto.precio FROM 
    producto, stock, categoria where stock.id_Producto=producto.id_Producto && producto.id_Categoria=categoria.id_Categoria && producto.id_Producto=${id} group by stock.id_Producto`;
    connection.query(sql, (err, results) => {
        if (err) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('No hay nada')
        }
    })
});


router.get('/consultarStock/', (req, res) => {
    const { id } = req.params
    const sql = `SELECT stock.id_Stock, producto.nombre, sum(stock.cantidad) as cantidad , producto.id_Producto, categoria.id_Categoria, 
    categoria.descripcion, producto.precio FROM 
    producto, stock, categoria where stock.id_Producto=producto.id_Producto && producto.id_Categoria=categoria.id_Categoria && producto.id_Producto=1 group by stock.id_Producto`;
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
        subtotal: req.body.subtotal,
        estado: "A"

    }
    connection.query(sql, carrito, error => {
        if (error) throw error;
    })

    res.json(req.body)

});

router.post('/agregarProducto', (req, res) => {
    const sql = 'INSERT INTO producto SET ?';
    const producto = {
        id_Categoria: req.body.id_Categoria,
        nombre: req.body.nombre,
        precio: req.body.precio,
        estado: "A"

    }
    connection.query(sql, producto, error => {
        if (error) throw error;
    })

    res.json(req.body)

});

router.put('/modificarProducto/:id', (req, res) => {

    const { id } = req.params;
    const { nombre, precio } =
    req.body;

    const sql = `UPDATE producto SET nombre= '${nombre}', precio= '${precio}'
  where id_Producto=${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send("Producto modificado");
    })


});


router.delete('/eliminarProducto/:id', (req, res) => {
    const { id } = req.params;
    const { estado } =
    req.body;

    const sql = `UPDATE producto SET estado="I" where id_Producto=${id}`;

    connection.query(sql, error => {
        if (error) throw error;
        res.send("Producto eliminado");
    })

});

router.use(express.static('public'));