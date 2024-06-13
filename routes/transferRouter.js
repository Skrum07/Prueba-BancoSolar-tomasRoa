import express from "express";
import { addTransfer } from "../controllers/transferController.js";

const router = express.Router();

router.post("/transferencia", addTransfer);

// router.get("/transferencias", getTransfers);

export default router