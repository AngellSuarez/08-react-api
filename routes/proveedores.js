const express = require("express");

const ProveedorController = require("../controllers/proveedores")

const router = express.Router();

router.get("/proveedores",ProveedorController.getAllProveedores);
router.post("/proveedores",ProveedorController.postProveedor);
router.get("/proveedores/:id",ProveedorController.getProveedorById);
router.patch("/proveedores/:id",ProveedorController.patchProveedorById);
router.delete("/proveedores/:id",ProveedorController.deleteProveedor);

module.exports = router