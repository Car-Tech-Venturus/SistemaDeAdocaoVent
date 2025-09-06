import express from "express";
import animalRoutes from "./animalRoutes.js";
import adminRoutes from "./adminRoutes.js";
import doacaoRoutes from "./doacaoRoutes.js";
import loginRoutes from "./loginRoutes.js";
import pedidoAdocaoRoutes from "./pedidoAdocaoRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";


const router = express.Router();

// Registrando cada rota com um caminho base
router.use("/animals", animalRoutes);
router.use("/admin", adminRoutes);
router.use("/doacoes", doacaoRoutes);
router.use("/login", loginRoutes);
router.use("/pedidos-adocao", pedidoAdocaoRoutes);
router.use("/usuarios", usuarioRoutes);

export default router;