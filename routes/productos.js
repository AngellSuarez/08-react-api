const express = require('express')
const router = express.Router()
const ProductosController = require('../controllers/productos')

router.get('/productos',ProductosController.getAllProductos);


module.exports = router