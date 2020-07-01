const express = require('express');
const router = express.Router();
const connection = require ('../database');

const bodyParser =require ('body-parser');

module.exports =router;

router.use(bodyParser.json());


router.get('/', (req,res)=>
{
    res.send('hello word')
});

router.get('/listarCarrito', (req, res) =>
{ 
    const sql = 'SELECT * FROM carrito where estado="A"';
    connection.query(sql, (err, results)=>{
      if(err) throw error;
      if(results.length>0){
        res.json(results);
      }else{
        res.send('No hay nada')
      }
    } )
});

router.get('/consultarCarrito/:id', (req, res) =>
{
 const {id}= req.params
  const sql =`SELECT * FROM carrito where id_Transaccion=${id}`;
  connection.query(sql, (err, results)=>{
    if(err) throw error;
    if(results.length>0){
      res.json(results);
    }else{
      res.send('No hay nada')
    }
  } ) 
});

router.post('/agregarCarrito', (req, res) =>
{ 
  const sql = 'INSERT INTO carrito SET ?';
  const usuario = {
    id_Cliente: req.body.id_Cliente,
    id_Producto : req.body.id_Producto,
    cantidad: req.body.cantidad,
    subtotal: req.body.subtotal, 
    estado: "A"

  }
  connection.query(sql, carrito, error => {
    if(error) throw error;
  })

  res.json(req.body)

});

router.put('/modificarCarrito/:id', (req, res) =>
{
  
  const{id} = req.params; 
  const {id_Cliente, id_Producto, cantidad, subtotal} =
  req.body;

  const sql = `UPDATE carrito SET id_Cliente= '${id_Cliente}' , id_Producto= '${id_Producto}', apellidos='${apellidos}',
  cantidad='${cantidad}', subtotal='${subtotal}'
  where id_Transaccion=${id}`;

  connection.query(sql, error => {
    if(error) throw error;
    res.send("carrito modificado");
  })
});

router.delete('/eliminarCarrito/:id', (req, res) =>
{ 
  const{id} = req.params; 
  const {estado} =
  req.body;

  const sql = `UPDATE carrito SET estado="I" where id_Transaccion=${id}`;

  connection.query(sql, error => {
    if(error) throw error;
    res.send("carrito eliminado");
  })

});

router.use(express.static('public'));