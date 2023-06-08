var Producto = require('../models/producto');
var Categoria = require('../models/categoria');
var Subcategoria = require('../models/subcategoria');
var Variedad = require('../models/variedad');
var Galeria = require('../models/galeria');

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

const obtener_productos_tienda = async function(req,res){
//var data_productos=[];
    //obtener los productos
    var productos = await Producto.find({estado:true}).sort({createdAt:-1});

    // for(var item of productos){
    // var variedades = await Variedad.find({producto:item._id});
    // data_productos.push({
    //     titulo : item.titulo,
    //     slug : item.slug,
    //     categoria : item.categoria,
    //     subcategoria : item.subcategoria,
    //     precio : item.precio,
    //     extracto :item.extracto,
    //     portada : item.portada,
    //     stok :item.stok,
    //     str_variedad :item.str_variedad ,
    //     estado : item.estado,//campo para saber si el usuarioesta activo
    //     descuento : item.descuento,
    //     createdAt : item.createdAt,//campo para colocar la fecha en la que se inserto el usuario
    //     variedades

    // });
    // item.subcategorias=[];
    // }
    res.status(200).send(productos);
}
const listar_categorias_public = async function(req,res){

    var regs = await Categoria.find().sort({titulo:1});
    var categorias = [];

    for(var item of regs){

        var subcategorias = await Subcategoria.find({categoria:item._id});
        var productos = await Producto.find({categoria:item.titulo});

        categorias.push({
            categoria: item,
            subcategorias,
            nproductos: productos.length
        });
    }

    res.status(200).send(categorias);

}

const obtener_producto_slug = async function(req,res){
    var slug = req.params['slug'];
    var producto = await Producto.findOne({slug:slug});
    var variedades = await Variedad.find({producto:producto._id}); 
    var galeria = await Galeria.find({producto:producto._id}); 

    res.status(200).send({producto,variedades,galeria});
}

const obtener_producto_categoria = async function(req,res){
    var categoria = req.params['categoria'];
    var productos = await Producto.find({categoria:categoria}).limit(6);
    res.status(200).send({productos});
}
module.exports = {
    obtener_nuevos_productos,
    obtener_productos_recomendados,
    obtener_productos_tienda,
    listar_categorias_public,
    obtener_producto_slug,
    obtener_producto_categoria 
}