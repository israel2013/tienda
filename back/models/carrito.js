//modelo que tedendra un usuario
var mongoose = require('mongoose');

var Schema= mongoose.Schema;
//creamos nuestrp primer modelo
var CarritoSchema = Schema({
    producto: {type: Schema.ObjectId,ref:'producto', required: true},//NF
    variedad: {type: Schema.ObjectId,ref:'variedad', required: true},//NF
    cantidad: {type: Number, required: true},//NF
    cliente: {type: Schema.ObjectId,ref:'cliente', required: true},
    createdAt : {type: Date,default:Date.now }//campo para colocar la fecha en la que se inserto el usuario

})

//expostamos el modelo
module.exports=mongoose.model('carrito',CarritoSchema);

//password : {type: String, required: true}