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

router.get('/listarPedido', (req, res) =>
{ 
    const sql = 'SELECT * FROM pedido where estado="A"';
    connection.query(sql, (err, results)=>{
      if(err) throw error;
      if(results.length>0){
        res.json(results);
      }else{
        res.send('No hay nada')
      }
    } )
});

router.get('/consultarPedido/:id', (req, res) =>
{
 const {id}= req.params
  const sql =`SELECT * FROM pedido where id_Pedido=${id}`;
  connection.query(sql, (err, results)=>{
    if(err) throw error;
    if(results.length>0){
      res.json(results);
    }else{
      res.send('No hay nada')
    }
  } ) 
});

router.post('/agregarPedido', (req, res) =>
{ 
  const sql = 'INSERT INTO pedido SET ?';
  const pedido = {

    id_Transaccion: req.body.id_Transaccion,
    total: req.body.total,
    estado: "A"

  }
  connection.query(sql, pedido, error => {
    if(error) throw error;
  })

  res.json(req.body)

});

router.put('/modificarPedido/:id', (req, res) =>
{
  
  const{id} = req.params; 
  const {total} =
  req.body;

  const sql = `UPDATE pedido SET total= '${total}'
  where id_Pedido=${id}`;

  connection.query(sql, error => {
    if(error) throw error;
    res.send("Pedido modificado");
  })


});

router.delete('/eliminarPedido/:id', (req, res) =>
{ 
  const{id} = req.params; 
  const {estado} =
  req.body;

  const sql = `UPDATE pedido SET estado="I" where id_Pedido=${id}`;

  connection.query(sql, error => {
    if(error) throw error;
    res.send("Pedido eliminado");
  })

});

router.use(express.static('public'));