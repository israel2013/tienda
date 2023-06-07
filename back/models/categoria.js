//modelo que tedendra un usuario
var mongoose = require('mongoose');
var Schema= mongoose.Schema;
//creamos nuestrp primer modelo
var CategoriaSchema = Schema({
titulo: {type: String, required: true},
slug: {type: String, required: true},
estado : {type: Boolean,default:true, required: true},
createdAt : {type: Date,default:Date.now }//campo para colocar la fecha en la que se inserto el usuario
})

//expostamos el modelo
module.exports=mongoose.model('categoria',CategoriaSchema);

//password : {type: String, required: true}