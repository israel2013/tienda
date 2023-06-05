//modelo que tedendra un usuario
var mongoose = require('mongoose');
var Schema= mongoose.Schema;
//creamos nuestrp primer modelo
var GaleriaSchema = Schema({
imagen: {type: String, required: true},
producto : {type: Schema.ObjectId,ref:'producto', required: true},
createdAt : {type: Date,default:Date.now }//campo para colocar la fecha en la que se inserto el usuario
})

//expostamos el modelo
module.exports=mongoose.model('galeria',GaleriaSchema);

//password : {type: String, required: true}