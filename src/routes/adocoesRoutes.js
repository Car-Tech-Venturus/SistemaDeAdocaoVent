import express from "express";
import { apenasAdmin, autenticarToken } from "../middlewares/authMiddlewares.js";
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js";
import adocoesController from "../controllers/adocoesControllers.js";

const router = express.Router();

//POST: /adocoes

router.post("/adocoes",
    autenticarToken,
    apenasAdmin,
    validarCamposObrigatorios(["pedidoAdocaoId", "dataAdocao"]),
)

export default router;