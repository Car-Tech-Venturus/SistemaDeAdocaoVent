import express from "express";
import usuarioController from "../controllers/tutoresControllers.js";
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js";

const router = express.Router();

// Lista os usuários
router.get("/tutores/:id", usuarioController.buscarPorId);

// Cadastra usuário
router.post("/tutores", 
    validarCamposObrigatorios(["nome", "email", "senha"]),
    usuarioController.cadastrar
);

// Atualizar usuário
router.patch("/tutores/:id", usuarioController.atualizar);

export default router;
