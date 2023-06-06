//modelo que tedendra un usuario
var mongoose = require('mongoose');

var Schema= mongoose.Schema;
//creamos nuestrp primer modelo
var ClienteSchema = Schema({
nombres : {type: String, required: true},
apellidos : {type: String, required: false},
email : {type: String, required: true,unique:true},
password : {type: String, required: true},
estado : {type: Boolean,default:true},//campo para saber si el usuarioesta activo
pais: {type: String, required: false},
recovery : {type: String, required: false},
genero : {type: String, required: false},
createdAt : {type: Date,default:Date.now }//campo para colocar la fecha en la que se inserto el usuario


})

//expostamos el modelo
module.exports=mongoose.model('cliente',ClienteSchema);

//password : {type: String, required: true}