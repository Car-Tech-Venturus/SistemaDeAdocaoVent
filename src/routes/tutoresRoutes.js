import express from "express";
import usuarioController from "../controllers/tutoresControllers.js";

const router = express.Router();

// Lista os usuários
router.get("/tutores/:id", usuarioController.buscarPorId);

// Cadastra usuário
router.post("/tutores", usuarioController.cadastrar);

// Atualizar usuário
router.patch("/tutores/:id", usuarioController.atualizar);

export default router;
