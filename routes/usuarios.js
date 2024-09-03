const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/usuarios")

router.post("/register",UsuariosController.registerUsuario);
router.post("/login",UsuariosController.loginUsuario);
router.get("/usuarios",UsuariosController.getAllUsuarios);
router.get("/usuarios/:id",UsuariosController.getUsuarioId);
router.delete("/usuarios/:id",UsuariosController.deleteUsuario);

module.exports = router