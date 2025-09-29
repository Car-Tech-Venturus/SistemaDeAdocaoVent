import express from "express";
import animalRoutes from "./animalRoutes.js";
import adminRoutes from "./adminRoutes.js";
import doacaoRoutes from "./doacaoRoutes.js";
import loginRoutes from "./loginRoutes.js";
import pedidoAdocaoRoutes from "./pedidoAdocaoRoutes.js";
import tutoresRoutes from "./tutoresRoutes.js";
import adocoesRoutes from "./adocoesRoutes.js";


const router = express.Router();

// Registrando cada rota com um caminho base
router.use("/", animalRoutes);
router.use("/", adminRoutes);
router.use("/", doacaoRoutes);
router.use("/", loginRoutes);
router.use("/", pedidoAdocaoRoutes);
router.use("/", tutoresRoutes);
router.use("/", adocoesRoutes);

export default router;