var jwr = require('jwt-simple');
var moment = require('moment');
var secret='luna';

//exportamos el metodo decodificar token 
exports.decodeToken=function(req,res,next){
//console.log(req.headers);
if(!req.headers.authorization){
    return res.status(403).send({message:'NoHeadersError'});
}
//guardamos el token
var token = req.headers.authorization;
var segment = token.split('.');//separamos los segmentos del token, los segmnetos estan divididos por un punto
//el token esta conformador por 3 segmentos separados por punto
//validamos que existen 3 puntos 
if(segment.length!=3){
    return res.status(401).send({message:'InvalidToken'});
}else{
    //el echo de que tenga los 3 punto no quiere decir que este bien 
    //hacemos una ultima validacion, el token tiene que ser correcto
    try{
        var payload = jwr.decode(token,secret);
    }catch(error){
        return res.status(401).send({message:'ErrorToken'});
    }
}
req.user = payload;
next();
}