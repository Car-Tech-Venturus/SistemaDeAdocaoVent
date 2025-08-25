import express from "express";
import animalRoutes from "./animalRoutes";
import adminRoutes from "./adminRoutes";
import doacaoRoutes from "./doacaoRoutes";
import loginRoutes from "./loginRoutes";
import pedidoAdocaoRoutes from "./pedidoAdocaoRoutes";
import usuarioRoutes from "./usuarioRoutes";


const router = express.Router();

// Registrando cada rota com um caminho base
router.use("/animals", animalRoutes);
router.use("/admin", adminRoutes);
router.use("/doacoes", doacaoRoutes);
router.use("/login", loginRoutes);
router.use("/pedidos-adocao", pedidoAdocaoRoutes);
router.use("/usuarios", usuarioRoutes);

export default router;