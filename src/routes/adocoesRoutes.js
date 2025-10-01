import express from "express";
import { apenasAdmin, autenticarToken } from "../middlewares/authMiddlewares.js";
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js";
import adocoesController from "../controllers/adocoesControllers.js";

const router = express.Router();

//POST: /adocoes

router.post("/adocoes",
    autenticarToken,
    //penasAdmin,
    validarCamposObrigatorios(["pedidoAdocaoId", "dataAdocao"]),
    adocoesController.create
)

export default router;