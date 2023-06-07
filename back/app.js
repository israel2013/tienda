//archivo inicial que va a correr el backend
const express  = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
var port=process.env.port || 4201;

var app = express();

var cliente_router = require('./routes/cliente');
var usuario_router = require('./routes/usuario');
var producto_router = require('./routes/producto');
var public_router = require('./routes/public');

app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));


//conexion a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/tienda',{
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

app.listen(port,function(){
    console.log('Servidor correindo '+port);

});

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


module.exports=app;
