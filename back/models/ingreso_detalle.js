//modelo que tedendra un usuario
var mongoose = require('mongoose');

var Schema= mongoose.Schema;
//creamos nuestrp primer modelo
var Ingreso_detalleSchema = Schema({
cantidad : {type:Number, required: true},
precio_unidad : {type:Number, required: true},
ingreso: {type: Schema.ObjectId,ref:'ingreso', required: true},
producto: {type: Schema.ObjectId,ref:'producto', required: true},
createdAt : {type: Date,default:Date.now }//campo para colocar la fecha en la que se inserto el usuario


})

//expostamos el modelo
module.exports=mongoose.model('ingreso_detalle',Ingreso_detalleSchema);

//password : {type: String, required: true}