const express = require('express');

const servicioController = require('../controllers/servicios');

const router = express.Router();

router.post('/servicios', servicioController.postServicio);
router.get('/servicios', servicioController.getAllServicios);
router.get('/servicios/:id', servicioController.getServicioById);
router.patch('/servicios/:id', servicioController.patchServicioById);
router.delete('/servicios/:id', servicioController.deleteServicio);

module.exports = router