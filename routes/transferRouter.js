import express from "express";
import { addTransfer, getTransfers } from "../controllers/transferController.js";

const router = express.Router();

router.post("/transferencia", addTransfer);

router.get("/transferencias", getTransfers);

router.get('*', (req, res) => {
    res.status(404).send("Ruta no encontrada");
});

export default router