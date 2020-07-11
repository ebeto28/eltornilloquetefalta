const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

app.use(require('./src/routs/clientes'));
app.use(require('./src/routs/categoria'));
app.use(require('./src/routs/carrito'));
app.use(require('./src/routs/stock.js'));
app.use(require('./src/routs/pedido.js'));
app.use(require('./src/routs/producto.js'));

/*app.get('/', (req,res)=>{
    res.json({
        ms:'hola'
    });
})*/
app.listen(port, () => {
    console.log(`Server on port:${port}`)
})