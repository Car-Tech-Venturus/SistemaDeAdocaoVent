import express from "express";
import usuarioController from "../controllers/tutoresControllers.js";
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js";

const router = express.Router();

// Lista os usuários
router.get("/:id", usuarioController.buscarPorId);

// Cadastra usuário
router.post("/",
    validarCamposObrigatorios(["email", "senha", "nome_completo", "cidade", "estado", "idade", "telefone", "administrador"]),
    usuarioController.cadastrar
);

// Atualizar usuário
router.patch("/:id", usuarioController.atualizar);

export default router;
