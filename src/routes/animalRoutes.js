import express from "express";
import animalController from "../controllers/animalController.js";

const router = express.Router();

//Separei primeiras as rotas de admin e dps as rotas públicas, para ficar melhor identado
//Também pq se eu não me engano, o express lê as rotas de cima pra baixo

// Listar todos os animais (Admin)
router.get("/admin/animais", animalController.listarAdmin);

// Atualizar animal (Admin)
router.patch("/admin/animais/:id", animalController.atualizar);

// Deletar animal (Admin)
router.delete("/admin/animais/:id", animalController.deletar);


// Buscar animal por ID
router.get("/:id", animalController.buscarPorId);

// Listar todos os animais
router.get("/", animalController.listar);

// Cadastrar animal
router.post("/", animalController.cadastrar);

export default router;

