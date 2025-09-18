import express from "express";
import adocoesController from "../controllers/adocoesControllers.js";

const router = express.Router();

//POST: /adocoes

router.post("/adocoes",
    autenticarToken,
    apenasAdmin,
    validarCamposObrigatorios(["pedidoAdocaoId", "dataAdocao"]),
)

export default router;