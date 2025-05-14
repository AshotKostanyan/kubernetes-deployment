import { pool } from "./config/pool.js";

async function migrate() {
    try {
        const dbName = process.env.DB_NAME || "my_database";

        await pool.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
        console.log(`Database '${dbName}' ensured.`);
        await pool.query(`USE ${dbName};`);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Migration completed successfully.");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        pool.end();
    }
    process.exit(0);
}

migrate();
