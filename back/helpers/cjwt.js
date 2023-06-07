var jwt = require('jwt-simple');
var moment = require('moment');
var secret ='20130026luna';

//le pasamos un objeto usuario y me devuelve los datos encriptados
exports.createToken=function(cliente){
var payload={
    sub: cliente._id,
    nombres: cliente.nombres,
    apellidos: cliente.apellidos,
    email: cliente.email,
    genero: cliente.rol,
    iat: moment().unix(),
    exp: moment().add(1,'day').unix()////iat: contiene la fecha de creacion del token. exp: fecha expiracion del token

}

return jwt.encode(payload,secret);//recibe el objeto usuario y una contraseña pra encriptar

}