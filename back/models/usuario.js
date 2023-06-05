//modelo que tedendra un usuario
var mongoose = require('mongoose');

var Schema= mongoose.Schema;
//creamos nuestrp primer modelo
var UsuarioSchema = Schema({
nombres : {type: String, required: true},
apellidos : {type: String, required: true},
email : {type: String, required: true,unique:true},
rol : {type: String, required: true},
password : {type: String, required: true},
estado : {type: Boolean,default:true, required: true},//campo para saber si el usuarioesta activo
createdAt : {type: Date,default:Date.now }//campo para colocar la fecha en la que se inserto el usuario


})

//expostamos el modelo
module.exports=mongoose.model('usuario',UsuarioSchema);

//password : {type: String, required: true}