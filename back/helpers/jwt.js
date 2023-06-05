var jwt = require('jwt-simple');
var moment = require('moment');
var secret ='luna';

//le pasamos un objeto usuario y me devuelve los datos encriptados
exports.createToken=function(usuario){
var payload={
    sub: usuario._id,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    email: usuario.email,
    rol: usuario.rol,
    iat: moment().unix(),
    exp: moment().add(1,'day').unix()////iat: contiene la fecha de creacion del token. exp: fecha expiracion del token

}

return jwt.encode(payload,secret);//recibe el objeto usuario y una contraseña pra encriptar

}