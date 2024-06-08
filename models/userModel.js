import { pool } from "../config/db";

export const getUserQueries = async (nombre, balance) => {
    try {
        const sql = {
            text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) *",
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
