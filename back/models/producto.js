//modelo que tedendra un usuario
var mongoose = require('mongoose');

var Schema= mongoose.Schema;
//creamos nuestrp primer modelo
var ProductoSchema = Schema({
titulo : {type: String, required: true},
slug : {type: String, required: true},
categoria : {type: String, required: true},
subcategoria : {type: String, required: true},
precio : {type: Number,default:0, required: true},
extracto : {type: String, required: true},
portada : {type: String, required: true},
stok : {type:Number,default:0, required: true},
str_variedad : {type: String, required: true},
estado : {type: Boolean, required: true},//campo para saber si el usuarioesta activo
descuento : {type: Boolean, required: true},
updatedAt : {type: Date,required:false},
createdAt : {type: Date,default:Date.now }//campo para colocar la fecha en la que se inserto el usuario
})

//expostamos el modelo
module.exports=mongoose.model('producto',ProductoSchema);

//password : {type: String, required: true}