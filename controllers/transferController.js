import { addTransferQuery } from "../models/transferModel.js";

export const addTransfer = async (req, res) => {
    const { emisor, receptor, monto } = req.body;
    try {
        const transfer = await addTransferQuery(emisor, receptor, monto);
        res.status(201).send(transfer);
    } catch (error) {
        console.log(error);
        res.status(500).send("Algo salio mal al insertar la transferencia");
    }
}