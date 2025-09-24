import express from "express"
import usuarioController from "../controllers/tutoresControllers.js";
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js";


const router = express.Router();

router.post("/login", 
    usuarioController.cadastrar,
    validarCamposObrigatorios(["nome", "email", "senha"])
); //não sei se ta certo, mas tem teoria é só isso, pede só o método post

export default router;