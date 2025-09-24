import express from "express"
import pedidoAdocaoController from "../controllers/pedidoAdocaoControllers.js"
import { apenasAdmin, autenticarToken } from "../middlewares/authMiddlewares.js";


const router = express.Router();

router.post("/adoacoes",
    autenticarToken,
    apenasAdmin,
)

export default router; 