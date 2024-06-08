import express from "express";
import { home } from "../controllers/userController.js";

const router = express.Router();

router.get("/", home);

router.get('*', (req, res) => {
    res.status(404).send("Ruta no encontrada");
});

export default router