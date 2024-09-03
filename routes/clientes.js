const express = require("express");
const ClientesControllers= require("../controllers/clientes");
const router = express.Router();

router.post("/clientes",ClientesControllers.postCliente);
router.get("/clientes",ClientesControllers.getAllClientes);
router.get("/clientes/:id",ClientesControllers.getClienteId);
router.patch("/clientes/:id",ClientesControllers.patchCliente);
router.delete("/clientes/:id",ClientesControllers.deleteCliente)

module.exports = router