const express = require("express")
const VentasController = require("../controllers/ventas")

const router = express.Router();

router.get("/venta",VentasController.getVentas);
router.get("/venta/:id",VentasController.getVentaPorId);
router.post("/venta",VentasController.postVenta);
router.put("/venta/:id",VentasController.modificarEstadoVenta)

module.exports = router
