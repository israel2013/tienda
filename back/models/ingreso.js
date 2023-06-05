//modelo que tedendra un usuario
var mongoose = require('mongoose');

var Schema= mongoose.Schema;
//creamos nuestrp primer modelo
var IngresoSchema = Schema({
proveedor : {type: String, required: true},//formulario
ncomprobante : {type: String, required: true},//formulario
documento : {type: String, required: true},//formu
monto_total : {type: String, required: true},//formu
serie : {type: Number, required: false},//NF
monto_resultante : {type: String, required: true},//NF
usuario : {type: Schema.ObjectId,ref:'usuario', required: true},//NF


createdAt : {type: Date,default:Date.now }//campo para colocar la fecha en la que se inserto el usuario


})

//expostamos el modelo
module.exports=mongoose.model('ingreso',IngresoSchema);

//password : {type: String, required: true}