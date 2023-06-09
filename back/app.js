//archivo inicial que va a correr el backend
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var port = process.env.port || 4201;//aqui lo pudo poner '0.0.0.0' para que netlify detecte que no es valido y lo haga automaticamente
var host = process.env.DB_URI || "mongodb://127.0.0.1:27017/tienda";
const { createServer } = require("http");
const { Server } = require("socket.io");
//IMPORTR VARIABLES DE ENTORNO LOCALES
require('dotenv').config({path: '../.env'});


var app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: '*'}
});

io.on("connection", (socket) => {
  // ...
  socket.on('send_cart',function(data){
    io.emit('listen_cart',data);
    console.log(data);
  });
});


var cliente_router = require('./routes/cliente');
var usuario_router = require('./routes/usuario');
var producto_router = require('./routes/producto');
var public_router = require('./routes/public');
var customer_router = require('./routes/customer');
const { Socket } = require('dgram');
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));


//conexion a la base de datos
//mongoose.connect('mongodb://127.0.0.1:27017/tienda',{
    mongoose.connect(host,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify:true,
    //useCreateIndex:true,
})
.then(()=> 
console.log("connect to the database!"))
.catch((err)=> console.log(err));

/*
mongoose.connect('mongodb://127.0.0.1:27017/tienda', ()=>{
   

app.listen(port,function(){
    console.log('Servidor correindo '+port);

});
});

*/

httpServer.listen(port,function(){
    console.log('Servidor correindo '+port);

});

/*
//Añado esto para el servidor
app.listen(port,host,() =>{
    console.log('Servidor funcionando ');

});
*/

//permite el tranpaso de datos de un servidor a nuestro backend 
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});


app.use('/api',cliente_router);
app.use('/api',usuario_router);
app.use('/api',producto_router);
app.use('/api',public_router);
app.use('/api',customer_router);


module.exports=app;
