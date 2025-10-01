import express from "express";
import { apenasAdmin, autenticarToken } from "../middlewares/authMiddlewares.js";
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js";
import PedidoAdocaoController from "../controllers/pedidoAdocaoControllers.js";

const router = express.Router();

//POST: /adocoes

router.post("/adocoes",
    autenticarToken,
    //apenasAdmin,
    validarCamposObrigatorios(["tutorId", "animalId", "status"]),
    PedidoAdocaoController.create
)

export default router;