//modelo que tedendra un usuario
var mongoose = require('mongoose');
var Schema= mongoose.Schema;
//creamos nuestrp primer modelo
var SubcategoriaSchema = Schema({
titulo: {type: String, required: true},
categoria : {type: Schema.ObjectId,ref:'categoria', required: true},
createdAt : {type: Date,default:Date.now }//campo para colocar la fecha en la que se inserto el usuario
})

//expostamos el modelo
module.exports=mongoose.model('subcategoria',SubcategoriaSchema);

//password : {type: String, required: true}