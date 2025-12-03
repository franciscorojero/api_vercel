import "dotenv/config";
import mysql from "mysql2";

const isProduction = process.env.NODE_ENV === "production";

const dbconfig = {
    host: isProduction ? process.env.DB_HOST : process.env.LOCAL_DB_HOST,
    port: isProduction ? process.env.DB_PORT : process.env.LOCAL_DB_PORT,
    user: isProduction ? process.env.DB_USER : process.env.LOCAL_DB_USER,
    password: isProduction ? process.env.DB_PASSWORD : process.env.LOCAL_DB_PASSWORD,
    database: isProduction ? process.env.DB_DATABASE : process.env.LOCAL_DB_DATABASE,
}

const db = mysql.createConnection(dbconfig);

// Probar conexión
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a MySQL:", err);
        return;
    }
    console.log("Conexión exitosa a MySQL");
});

export default db;
