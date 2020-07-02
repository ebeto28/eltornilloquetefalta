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

router.get('/listarCategoria', (req, res) =>
{ 
    const sql = 'SELECT * FROM categoria where estado="A"';
    connection.query(sql, (err, results)=>{
      if(err) throw error;
      if(results.length>0){
        res.json(results);
      }else{
        res.send('No hay nada')
      }
    } )
});

router.get('/consultarCategoria/:id', (req, res) =>
{
 const {id}= req.params
  const sql =`SELECT * FROM categoria where id_Categoria=${id}`;
  connection.query(sql, (err, results)=>{
    if(err) throw error;
    if(results.length>0){
      res.json(results);
    }else{
      res.send('No hay nada')
    }
  } ) 
});

router.post('/agregarCategoria', (req, res) =>
{ 
  const sql = 'INSERT INTO categoria SET ?';
  const categoria = {
    id_Categoria: req.body.id_Categoria,
    descripcion: req.body.descripcion,
    estado: "A"

  }
  connection.query(sql, categoria, error => {
    if(error) throw error;
  })

  res.json(req.body)

});

router.put('/modificarCategoria/:id', (req, res) =>
{
  const{id} = req.params; 
  const {descripcion} = req.body;

  const sql = `UPDATE categoria SET descripcion = '${descripcion}' where id_Categoria=${id}`;

  connection.query(sql, error => {
    if(error) throw error;
    res.send("Categoria modificada");
  })
});

router.delete('/eliminarCategoria/:id', (req, res) =>
{ 
  const{id} = req.params; 
  const {estado_Categoria } =
  req.body;

  const sql = `UPDATE categoria SET estado="I" where id_Categoria=${id}`;

  connection.query(sql, error => {
    if(error) throw error;
    res.send("Categoria eliminada");
  })

});

router.use(express.static('public'));