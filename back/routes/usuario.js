//en este archivo estan las rutas donde se encuentras los metodos que se van a ejecutar
const express  = require('express');
var usuarioController = require('../controllers/usuariocontroller');
var authenticate = require('../middlewares/aunthemticate');
const axios = require('axios').default;

var api= express.Router();

//se utiliza post porque se utiliza el cuerpo de la solicitud
//se utuliza get para obetener algo de la base de datos
//metodos registro_usuario_admin es para registrar un usuario
//login_usuario es para validar que un usuario este en la base de datos
api.post('/registro_usuario_admin',authenticate.decodeToken,usuarioController.registro_usuario_admin);
api.post('/login_usuario',usuarioController.login_usuario);
api.get('/listar_usuario_admin/:filtro?',authenticate.decodeToken,usuarioController.listar_usuario_admin);
api.get('/obtener_usuario_admin/:id',authenticate.decodeToken,usuarioController.obetener_usuario_admin);
api.put('/actualizar_usuario_admin/:id',authenticate.decodeToken,usuarioController.actualizar_usuario_admin);
api.put('/cambiar_estado_usuario_admin/:id',authenticate.decodeToken,usuarioController.cambiar_estado_usuario_admin);




module.exports=api;

