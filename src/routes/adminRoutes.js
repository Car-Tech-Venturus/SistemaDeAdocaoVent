import express from "express";
import { autenticarToken, apenasAdmin } from "../middlewares/authMiddlewares.js";
import AnimalController from "../controllers/animalControllers.js"; 

const router = express.Router();



// Visualizar todos os animais 
router.get(
  "/animais",
  autenticarToken,
  apenasAdmin,
  AnimalController.listarAdmin
);

// Atualizar animal
router.patch(
  "/animais/:id",
  autenticarToken,
  apenasAdmin,
  AnimalController.atualizar 
);

// Remover animal da base
router.delete(
  "/animais/:id",
  autenticarToken,
  apenasAdmin,
  AnimalController.deletar    
);

export default router;
