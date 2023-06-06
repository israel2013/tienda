//var Cliente = require = ('../models/cliente');
var Cliente= require('../models/cliente');

const registro_cliente_ecommerce = async function(req,res){
    //no se necesita validar un token porque es una vista publica
    let data = req.body;
    let cliente = await Cliente.create(data);
    res.status(200).send(cliente);
}

module.exports={
    registro_cliente_ecommerce
}