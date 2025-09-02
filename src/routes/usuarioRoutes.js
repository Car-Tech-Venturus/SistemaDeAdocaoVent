import express from "express";
import usuarioController from "../controllers/usuarioController.js";

const router = express.Router();

// Lista os usuários
router.get("/", usuarioController.listar);

// Cadastra usuário
router.post("/", usuarioController.cadastrar);

// Atualizar usuário
router.patch("/usuario/:id", usuarioController.atualizar);

export default router;
