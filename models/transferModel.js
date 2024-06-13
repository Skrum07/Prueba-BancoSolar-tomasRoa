import { pool } from "../config/db.js";

export const addTransferQuery = async (emisor, receptor, monto) => {
   const { id: emisorId } = (
      await pool.query("SELECT * FROM usuarios WHERE nombre = '${emisor}'")
   ).rows[0];

   const { id: receptorId } = (
      await pool.query("SELECT * FROM usuarios WHERE nombre = '${receptor}'")
   ).rows[0];

   const recordTransferQuery = {
       text: "INSERT INTO transferencias (emisor_id, receptor_id, monto, fecha) VALUES ($1, $2, $3, NOW())",
       values: [emisorId, receptorId, monto],
   };
   
   const refreshBalanceEmisorQuery = {
       text: "UPDATE usuarios SET balance = balance - $1 WHERE id = $2",
       values: [monto, emisorId],
   };

   const refreshBalanceReceptorQuery = {
       text: "UPDATE usuarios SET balance = balance + $1 WHERE id = $2",
       values: [monto, receptorId],
   };

   try {
       await pool.query("BEGIN");
       await pool.query(recordTransferQuery);
       await pool.query(refreshBalanceEmisorQuery);
       await pool.query(refreshBalanceReceptorQuery);
       await pool.query("COMMIT");
       return true;

   } catch (error) {
       console.log("ERROR CODE: ", error.code, "MESSAGE: ", error.message);
       await pool.query("ROLLBACK");
       throw error;
   };

   const getTransferQuery = async () => {
       try {
           const sql = {
               text: "SELECT * FROM transferencias",
           }
           const response = await pool.query(sql);
           if (response.rowCount > 0) {
               return response.rows
           } else {
               return new Error("No se encontraron transferencias")
           }
       } catch (error) {
           console.log("ERROR CODE: ", error.code, "MESSAGE: ", error.message);
       }
   }

}