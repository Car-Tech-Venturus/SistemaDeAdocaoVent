import express from "express";
import animalRoutes from "./animalRoutes.js";
import adminRoutes from "./adminRoutes.js";
import doacaoRoutes from "./doacaoRoutes.js";
import loginRoutes from "./loginRoutes.js";
import pedidoAdocaoRoutes from "./pedidoAdocaoRoutes.js";
import tutoresRoutes from "./tutoresRoutes.js";

import questionarioRoutes from "./questionarioRoutes.js"


const router = express.Router();

// Registrando cada rota com um caminho base
router.use("/animais", animalRoutes);
router.use("/admin", adminRoutes);
router.use("/doacoes", doacaoRoutes);
router.use("/login", loginRoutes);
router.use("/adocoes", pedidoAdocaoRoutes);
router.use("/tutores", tutoresRoutes);
router.use("/questionario", questionarioRoutes);

export default router;