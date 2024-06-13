import { addTransferQuery, getTransferQuery } from "../models/transferModel.js";

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

export const getTransfers = async (req, res) => {
    try {
        const transfers = await getTransferQuery();
        res.status(201).send(transfers);
    } catch (error) {
        console.log(error);
        res.status(500).send("Algo salio mal al obtener las transferencias");
    }
}