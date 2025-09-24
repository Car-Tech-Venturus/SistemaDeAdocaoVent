import express from "express";
import { apenasAdmin, autenticarToken } from "../middlewares/authMiddlewares.js";
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js";
import doacaoController from "../controllers/doacaoControllers.js";

const router = express.Router();

//POST: /doacoes
router.post("/doacoes",
    autenticarToken,
    validarCamposObrigatorios(["nome", "email", "valor", "linkPix"]),
    doacaoController.create
)
export default router;