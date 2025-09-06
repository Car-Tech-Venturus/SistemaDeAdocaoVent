import express from "express";
import usuarioController from "../controllers/usuarioControllers.js";

const router = express.Router();

// Lista os usuários
router.get("/:id", usuarioController.buscarPorId);

// Cadastra usuário
router.post("/", usuarioController.cadastrar);

// Atualizar usuário
router.patch("/usuario/:id", usuarioController.atualizar);

export default router;
