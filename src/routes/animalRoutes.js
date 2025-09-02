import express from "express";
import animalController from "../controllers/animalController.js";

const router = express.Router();

// Lista todos os animais
router.get("/", animalController.listar);

// Lista animal por ID
router.get("/:id", animalController.buscarPorId);

// Cadastra animal
router.post("/", animalController.cadastrar);

// Atualizar animal
router.patch("/animal/:id", animalController.atualizar);

export default router;
