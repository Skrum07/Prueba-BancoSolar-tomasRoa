import { addUserQueries, getUserQueries } from "../models/userModel.js";
import path from "path";
const __dirname = path.resolve();

export const home = (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
}

export const addUser = async (req, res) => {
    const {nombre, balance} = req.body;
    console.log(req.body)
    try {
        await addUserQueries(nombre, balance);
        res.status(201).send("Usuario creado con exito");
    } catch (error) {
        console.log(error);
        res.status(500).send("Algo salio mal al insertar el usuario");
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await getUserQueries();
        res.status(201).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Algo salio mal al obtener los usuarios");
    }
}
