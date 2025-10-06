import express from "express";
import { apenasAdmin} from "../middlewares/authMiddlewares.js";
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js";
import doacaoController from "../controllers/doacaoControllers.js";

const router = express.Router();

//POST: /doacoes
router.post("/",
    //autenticarToken,
    validarCamposObrigatorios(["nome","valor", "linkPix", "mensagem"]),
    doacaoController.create
)
export default router;