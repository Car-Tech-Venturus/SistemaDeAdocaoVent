import express from "express"
import loginController from "../controllers/loginControllers.js";
import { validarCamposObrigatorios } from "../middlewares/validMiddlewares.js";


const router = express.Router();

router.post("/", 
    validarCamposObrigatorios(["email", "senha"]),
    loginController.login
);

export default router;