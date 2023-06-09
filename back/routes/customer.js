const express  = require('express');
var customerController = require('../controllers/customerController');
var cauthemticate = require('../middlewares/cauthemticate');
var api= express.Router();

api.post('/crear_producto_carrito',cauthemticate.decodeToken,customerController.crear_producto_carrito);
api.get('/obtener_carrito_cliente',cauthemticate.decodeToken,customerController.obtener_carrito_cliente);

module.exports=api;

