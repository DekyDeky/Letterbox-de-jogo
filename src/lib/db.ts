import mysql from "mysql2/promise"

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "",
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

export default pool;