import express from "express"
import usuarioController from "../controllers/usuarioControllers.js";

const router = express.Router();

router.post("/cadastrar", usuarioController.cadastrar); //não sei se ta certo, mas tem teoria é só isso, pede só o método post