import express from "express"
import usuarioController from "../controllers/tutoresControllers.js";

const router = express.Router();

router.post("/login", usuarioController.cadastrar); //não sei se ta certo, mas tem teoria é só isso, pede só o método post

export default router;