import express from "express";
import animalController from "../controllers/animalControllers.js";
import { apenasAdmin } from "../middlewares/authMiddlewares.js"; 
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js"; 

const router = express.Router();

//Separei primeiras as rotas de admin e dps as rotas públicas, para ficar melhor identado
//Também pq se eu não me engano, o express lê as rotas de cima pra baixo

// Buscar animal por ID
router.get("/:id", animalController.buscarPorId);

// Listar todos os animais (com filtros opcionais)
router.get("/", animalController.listar);

// Cadastrar animal (pode ser admin também, então precisa de proteção)
router.post("/",
  validarCamposObrigatorios([
    "nome",
    "especie",
    "porte",
    "castrado",
    "vacinado",
    "descricao",
    "adotado"
  ]),
  animalController.cadastrar
);

export default router;