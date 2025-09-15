import express from "express";
import { autenticarToken, apenasAdmin } from "../middlewares/auth.js";
import { validarCamposObrigatorios } from "../middlewares/validarCampos.js";
import AdminController from "../controllers/AdminController.js";
import AnimalController from "../controllers/AnimalController.js"; 


const router = express.Router();

//Visualizar todos os animais (com filtros avançados)
router.get(
  "/admin/animais",
  autenticarToken,
  apenasAdmin,
  AnimalController.listarTodos
);

// Atualizar animal
router.patch(
  "/admin/animais/:id",
  autenticarToken,
  apenasAdmin,
  AnimalController.atualizar
);

//Remover animal da base
router.delete(
  "/admin/animais/:id",
  autenticarToken,
  apenasAdmin,
  AnimalController.remover
);


export default router;
