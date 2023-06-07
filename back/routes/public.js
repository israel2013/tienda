const express  = require('express');
var publicController = require('../controllers/publicController');
var api= express.Router();

api.get('/obtener_nuevos_productos',publicController.obtener_nuevos_productos);
api.get('/obtener_productos_recomendados',publicController.obtener_productos_recomendados);

api.get('/obtener_productos_tienda',publicController.obtener_productos_tienda);



module.exports=api;

