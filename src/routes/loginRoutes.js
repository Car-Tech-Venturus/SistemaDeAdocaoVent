import express from "express"
import loginController from "../controllers/loginControllers.js";
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js";


const router = express.Router();

router.post("/", 
    validarCamposObrigatorios(["email", "senha"]),
    loginController.logar
); //não sei se ta certo, mas tem teoria é só isso, pede só o método post

export default router;