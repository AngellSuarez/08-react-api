const express = require("express")
const VentasController = require("../controllers/ventas")

const router = express.Router();

router.get("/ventas",VentasController.getVentas);
router.get("/ventas/:id",VentasController.getVentaPorId);
router.post("/ventas",VentasController.postVenta);
router.put("/ventas/:id",VentasController.modificarEstadoVenta)

module.exports = router
