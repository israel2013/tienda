var Producto = require('../models/producto');

const obtener_nuevos_productos = async function(req,res){

    //obtener los primeros 4 productos 
    var productos = await Producto.find({estado:true}).sort({createdAt:-1}).limit(4);
    res.status(200).send(productos);
}

const obtener_productos_recomendados = async function(req,res){

    //obtener los primeros 4 productos 
    var productos = await Producto.find({estado:true}).limit(6);
    res.status(200).send(productos);
}
module.exports = {
    obtener_nuevos_productos,
    obtener_productos_recomendados
}