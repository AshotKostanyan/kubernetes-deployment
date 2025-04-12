import { pool } from "../config/pool.js"

export async function insert(req, res) {
    try {
        const { message } = req.body;
        await pool.query(`
            INSERT INTO messages (message) VALUES (?)
        `, [message]);

        return res.status(201).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `${error}` });
    }
}

export async function select(req, res) {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM messages
        `);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Message not found" });
        }

        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `${error}` });
    }
}
