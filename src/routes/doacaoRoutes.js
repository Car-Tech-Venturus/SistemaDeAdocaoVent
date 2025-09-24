import express from "express";

const router = express.Router();

//POST: /doacoes
router.post("/doacoes",
    autenticarToken,
    validarCamposObrigatorios(["nome", "email", "valor", "linkPix"]),
)
export default router;