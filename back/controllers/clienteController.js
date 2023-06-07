//var Cliente = require = ('../models/cliente');
var Cliente= require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/cjwt');

const registro_cliente_ecommerce = async function(req,res){
    //no se necesita validar un token porque es una vista publica
    let data = req.body;
    let reg = await Cliente.find({email:data.email});
    
    if(reg.length >= 1)
    //el correo ya existe
    {
        res.status(200).send({message:'El correo electronico ya existe'});

    }else{
        bcrypt.hash(data.password,null,null,async function(err,hash)
        {
            if(err){
                res.status(200).send({message:'Surgio un error con la encriptacion'});

            }else{
                data.password= hash;
                let cliente = await Cliente.create(data);
                res.status(200).send(cliente);
        
            }

        });

         
       
    }
}

//agregar autenticacion por email
const login_cliente= async function(req,res){
    var data= req.body;
    //en el arreglo usuarios ponemos el email que coincida con el que tiene data
    var clientes = await Cliente.find({email:data.email});
    //si el arreglo es mayor a 1, quiere decir que hay un correo registrado
    if(clientes.length >= 1){
    //correo existe
    //comparamos la contraseña que esta en la base de datos con la que se quiere acceder
    //la function con check devuelve un true si las contraseñas coinciden o un false si no
    if(clientes[0].estado){
        bcrypt.compare(data.password,clientes[0].password,async function(err,check){
        //si las contraseñas coinciden  creamos un token con el objeto usuario   
        if(check){
            res.status(200).send({token:jwt.createToken(clientes[0]),
             cliente:clientes[0]   
                });
        }else{
            res.status(200).send({data:undefined,message:'La contraseña es incorrecta'});
        }
        
        });
}else{
    res.status(200).send({data:undefined,message:'Su cuenta esta desactivada'}); 
}

} else{
    res.status(200).send({data:undefined,message:'No se encontro el correo electronico'});
}
//console.log(usuarios.length);
}

module.exports={
    registro_cliente_ecommerce,
    login_cliente
}