import express from "express";

const express = express();
const router = express.Router();
const usuarioController = require ("../controllers/usuarioControllers.js");

//Lista os usuários
router.get("/", usuarioController.listar);

//cadastra usuario
router.post("/", usuarioController.cadastrar);

//atualizar
router.patch("/:id",usuarioController.atualizar)

module.exports = router;