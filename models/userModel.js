import { pool } from "../config/db.js";

export const addUserQueries = async (nombre, balance) => {
    try {
        const sql = {
            text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) returning *",
            values: [nombre, balance]
        }

        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows 
        } else {
            return new Error("No se inserto el usuario")
        }
    } catch (error) {
        console.log("ERROR CODE: ", error.code, "MESSAGE: ", error.message);
    }
}

export const getUserQueries = async() => {
    try {
        const sql = {
            text: "SELECT * FROM usuarios",
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows
        } else {
            return new Error("No se encontraron usuarios")
        }
    } catch (error) {
        console.log("ERROR CODE: ", error.code, "MESSAGE: ", error.message);
    }
}