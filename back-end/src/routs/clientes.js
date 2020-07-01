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

router.get('/listarClientes', (req, res) =>
{ 
    const sql = 'SELECT * FROM clientes where estado="A"';
    connection.query(sql, (err, results)=>{
      if(err) throw error;
      if(results.length>0){
        res.json(results);
      }else{
        res.send('No hay nada')
      }
    } )
});

router.get('/consultarCliente/:id', (req, res) =>
{
 const {id}= req.params
  const sql =`SELECT * FROM clientes where id_Clientes=${id}`;
  connection.query(sql, (err, results)=>{
    if(err) throw error;
    if(results.length>0){
      res.json(results);
    }else{
      res.send('No hay nada')
    }
  } ) 
});

router.post('/agregarCliente', (req, res) =>
{ 
  const sql = 'INSERT INTO clientes SET ?';
  const usuario = {
    id_Clientes: req.body.id_Clientes,
    contrasenna: req.body.contrasenna,
    nombre : req.body.nombre,
    apellidos: req.body.apellidos,
    telefono: req.body.telefono, 
    codigopostal: req.body.codigopostal,
    pais: req.body.pais, 
    provincia: req.body.provincia,
    canton: req.body.canton,
    distrito: req.body.distrito,
    direccionexacta: req.body.direccionexacta,
    estado: "A"

  }
  connection.query(sql, clientes, error => {
    if(error) throw error;
  })

  res.json(req.body)

});

router.put('/modificarClientes/:id', (req, res) =>
{
  
  const{id} = req.params; 
  const {contrasenna, nombre, apellidos, telefono,codigopostal,pais, provincia, canton, distrito,direccionexacta} =
  req.body;

  const sql = `UPDATE clientes SET contrasenna= '${contrasenna}' , nombre= '${nombre}', apellidos='${apellidos}',
  telefono='${telefono}', codigopostal='${codigopostal}', pais= '${pais}', provincia= '${provincia} , canton= '${canton} , 
  distrito= '${distrito}, direccionexacta= '${direccionexacta}'
  where id_Clientes=${id}`;

  connection.query(sql, error => {
    if(error) throw error;
    res.send("usuario modificado");
  })


});

router.delete('/eliminarClientes/:id', (req, res) =>
{ 
  const{id} = req.params; 
  const {estado_Usuario } =
  req.body;

  const sql = `UPDATE clientes SET estado="I" where id_Clientes=${id}`;

  connection.query(sql, error => {
    if(error) throw error;
    res.send("cliente eliminado");
  })

});

router.use(express.static('public'));