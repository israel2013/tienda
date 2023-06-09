const express  = require('express');
var customerController = require('../controllers/customerController');
var cauthemticate = require('../middlewares/cauthemticate');
var api= express.Router();

api.post('/crear_producto_carrito',cauthemticate.decodeToken,customerController.crear_producto_carrito);
api.get('/obtener_carrito_cliente',cauthemticate.decodeToken,customerController.obtener_carrito_cliente);
api.delete('/eliminar_producto_carrito/:id',cauthemticate.decodeToken,customerController.eliminar_producto_carrito);
api.post('/crear_direccion_cliente',cauthemticate.decodeToken,customerController.crear_direccion_cliente);

api.get('/obternet_direcciones_cliente',cauthemticate.decodeToken,customerController.obternet_direcciones_cliente);
api.delete('/eliminar_direccion_cliente/:id',cauthemticate.decodeToken,customerController.eliminar_direccion_cliente);

api.get('/validar_payment_id_venta/:payment_id',cauthemticate.decodeToken,customerController.validar_payment_id_venta);
api.post('/crear_venta_cliente',cauthemticate.decodeToken,customerController.crear_venta_cliente);


module.exports=api;

