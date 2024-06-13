import { pool } from "../config/db.js";

export const addTransferQuery = async (emisor, receptor, monto) => {
   const { id: emisorId } = (
      await pool.query(`SELECT * FROM usuarios WHERE nombre = '${emisor}'`)
   ).rows[0];

   const { id: receptorId } = (
      await pool.query(`SELECT * FROM usuarios WHERE nombre = '${receptor}'`)
   ).rows[0];

   const recordTransferQuery = {
       text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW())",
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
       console.log(error);
       await pool.query("ROLLBACK");
       throw error;
   }
};

   export const getTransferQuery = async () => {
       try {
           const sql = {
               text: `SELECT
                    t.id,
                    e.nombre AS emisor,
                    r.nombre AS receptor,
                    t.monto,
                    t.fecha 

                    FROM transferencias t
                    JOIN usuarios e ON t.emisor = e.id
                    JOIN usuarios r ON t.receptor = r.id`,

                        text: 'SELECT * FROM transferencias',
                    rowMode: "array",
           };
           const result = await pool.query(sql);
           if (result.rowCount > 0) {
               return result.rows;
           } else {
               return null
           }

       } catch (error) {
           console.log("ERROR CODE: ", error.code, "MESSAGE: ", error.message);
       }
   }



