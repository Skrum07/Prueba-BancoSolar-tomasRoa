import { addUserQueries } from "../models/userModel.js";

export const home = (req, res) => {
    res.send("Hola desde el controlador de usuarios");
}

export const addUser = async (req, res) => {
    const {nombre, balance} = req.body;
    try {
        await addUserQueries(nombre, balance);
        res.send("Usuario insertado")
    } catch (error) {
        console.log("ERROR CODE: ", error.code, "MESSAGE: ", error.message);
    }
}

