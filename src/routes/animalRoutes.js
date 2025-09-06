import express from "express";
import animalController from "../controllers/animalController.js";

const router = express.Router();

// Lista todos os animais
router.get("/", animalController.listar);

// Lista animal por ID
router.get("/:id", animalController.buscarPorId);

// Lista todos os animais (rota admin)
router.get("/admin/animais", animalController.listarAdmin);       

// Cadastra animal
router.post("/", animalController.cadastrar);

// Atualizar animal
router.patch("/admin/animais/:id", animalController.atualizar);

// Deletar animal
router.delete("/admin/animais/:id", animalController.deletar);

export default router;
