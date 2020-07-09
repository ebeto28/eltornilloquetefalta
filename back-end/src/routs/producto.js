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

router.get('/listarProducto', (req, res) =>
{ 
    const sql = 'SELECT * FROM producto where estado="A"';
    connection.query(sql, (err, results)=>{
      if(err) throw error;
      if(results.length>0){
        res.json(results);
      }else{
        res.send('No hay nada')
      }
    } )
});

router.get('/consultarProducto/:id', (req, res) =>
{
 const {id}= req.params
  const sql =`SELECT * FROM producto where id_Producto=${id}`;
  connection.query(sql, (err, results)=>{
    if(err) throw error;
    if(results.length>0){
      res.json(results);
    }else{
      res.send('No hay nada')
    }
  } ) 
});

router.post('/agregarProducto', (req, res) =>
{ 
  const sql = 'INSERT INTO producto SET ?';
  const producto = {
    id_Categoria: req.body.id_Categoria,
    nombre : req.body.nombre,
    precio: req.body.precio,
    estado: "A"

  }
  connection.query(sql, producto, error => {
    if(error) throw error;
  })

  res.json(req.body)

});

router.put('/modificarProducto/:id', (req, res) =>
{
  
  const{id} = req.params; 
  const {nombre, precio} =
  req.body;

  const sql = `UPDATE producto SET nombre= '${nombre}', precio= '${precio}'
  where id_Producto=${id}`;

  connection.query(sql, error => {
    if(error) throw error;
    res.send("Producto modificado");
  })


});

router.delete('/eliminarProducto/:id', (req, res) =>
{ 
  const{id} = req.params; 
  const {estado} =
  req.body;

  const sql = `UPDATE producto SET estado="I" where id_Producto=${id}`;

  connection.query(sql, error => {
    if(error) throw error;
    res.send("Producto eliminado");
  })

});

router.use(express.static('public'));