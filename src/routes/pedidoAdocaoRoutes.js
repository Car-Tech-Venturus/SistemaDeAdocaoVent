import express from "express"
import { apenasAdmin } from "../middlewares/authMiddlewares";

const router = express.Router();

router.post("/adoacoes",
    autenticarToken,
    apenasAdmin,
)

export default router; 