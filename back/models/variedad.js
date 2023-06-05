//modelo que tedendra un usuario
var mongoose = require('mongoose');
var Schema= mongoose.Schema;
//creamos nuestrp primer modelo
var VariedadSchema = Schema({
proveedor : {type: String, required: true},
variedad : {type: String, required: true},
sku : {type: String, required: true},
stok : {type: Number,default:0, required: true},
producto : {type: Schema.ObjectId,ref:'producto', required: true},
createdAt : {type: Date,default:Date.now }//campo para colocar la fecha en la que se inserto el usuario


})

//expostamos el modelo
module.exports=mongoose.model('variedad',VariedadSchema);

//password : {type: String, required: true}