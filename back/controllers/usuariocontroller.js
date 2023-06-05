var Usuario = require('../models/usuario');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
const usuario = require('../models/usuario');

//registrar admin
const registro_usuario_admin = async function(req,res){
//console.log(req.body);
//para registrar un usuario admin se tiene que recibir un token decodificado
if(req.user){
    let data = req.body;
let usuarios= await Usuario.find({email:data.email});
//console.log(usuarios);
//validamos que el correo no se inserte dos veces
if(usuarios.length >= 1)
{
    res.status(200).send({data:undefined,message:'El correo electronico ya existe'});
}else{
    bcrypt.hash('123456',null,null, async function(err,hash){

        if(err){
            res.status(200).send({data:undefined,message:'No se puede encriptar'});
        }else
        console.log(hash);
        data.password = hash;
        let usuario= await Usuario.create(data);
        res.status(200).send({data:usuario});
    });
}

}else{
    res.status(500).send({data:undefined,message:'ErrorToken'});    
}

/*
bcrypt.hash('123456',null,null, async function(err,hash){

    if(err){
        res.status(200).send({data:undefined,message:'No se puede encriptar'});
    }else
    console.log(hash);
    data.password = hash;
    let usuario= await Usuario.create(data);
    res.status(200).send({data:usuario});
});
*/
}

//login del colaborador
const login_usuario = async function(req,res){
    var data= req.body;
    //en el arreglo usuarios ponemos el email que coincida con el que tiene data
var usuarios = await Usuario.find({email:data.email});
//si el arreglo es mayor a 1, quiere decir que hay un correo registrado
if(usuarios.length >= 1){
//correo existe
//comparamos la contraseña que esta en la base de datos con la que se quiere acceder
//la function con check devuelve un true si las contraseñas coinciden o un false si no
if(usuarios[0].estado){
    bcrypt.compare(data.password,usuarios[0].password,async function(err,check){
        //si las contraseñas coinciden  creamos un token con el objeto usuario   
        if(check){
            res.status(200).send({token:jwt.createToken(usuarios[0]),
             usuario:usuarios[0]   
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

const listar_usuario_admin =async function(req,res){
    //validamos si el usuario esta en la peticion 
 if(req.user){
    let filtro = req.params['filtro'];
    //hacemos una busqueda de un usuario
    let usuarios = await Usuario.find({

        $or:[

            {nombres:new RegExp(filtro,'i')},
            {apellidos:new RegExp(filtro,'i')},
            {email:new RegExp(filtro,'i')},
        ]

    });
    res.status(200).send(usuarios);
 }else
 {
    res.status(500).send({data:undefined,message:'Error token'});
 }   
}

//metodo para obtener un usuario
const obetener_usuario_admin = async function(req,res){
//validamos si el usuario esta en la peticion 
 if(req.user){
   let id = req.params['id'];
   //validamos que solo esten id correctos
   try {
    let usuario = await Usuario.findById({_id:id})

    res.status(200).send(usuario);
    
   } catch (error) {
    res.status(200).send(undefined);
   }

 }else
 {
    res.status(500).send({data:undefined,message:'Error token'});
 }   
}


const actualizar_usuario_admin = async function(req,res){
    //validamos si el usuario esta en la peticion 
     if(req.user){
       let id = req.params['id'];
       let data = req.body;

       //creamos un objeto usuario con los datos ya actualizados
       let usuario = await Usuario.findByIdAndUpdate({_id:id},{
        nombres:data.nombres,
        apellidos:data.apellidos,
        rol:data.rol,
        email:data.email,
       });
       res.status(200).send(usuario);


      
     }else
     {
        res.status(500).send({data:undefined,message:'Error token'});
     }   
    }
    

    const cambiar_estado_usuario_admin = async function(req,res){
        //validamos si el usuario esta en la peticion 
         if(req.user){
           let id = req.params['id'];
           let data = req.body;
           let nuevo_estado=false;
           if(data.estado){
            nuevo_estado=false;
           }else{
            nuevo_estado=true;
           }

    
           //creamos un objeto usuario con los datos ya actualizados
           let usuario = await Usuario.findByIdAndUpdate({_id:id},{
            estado:nuevo_estado
           });
           res.status(200).send(usuario);
    
    
          
         }else
         {
            res.status(500).send({data:undefined,message:'Error token'});
         }   
        }
        

            


//exportamos los modulos para que otro archivo pueda usarlos
module.exports = {
    registro_usuario_admin,
    login_usuario,
    listar_usuario_admin,
    obetener_usuario_admin,
    actualizar_usuario_admin,
    cambiar_estado_usuario_admin  
}