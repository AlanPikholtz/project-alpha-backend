import { normalizeRow } from "../../utils/db.js";
export async function insertTransaction(fastify, data) {
    const [result] = await fastify.mysql.execute("INSERT INTO transactions (user_id, account_id, transaction_type, amount, currency, description, reference) VALUES (?, ?, ?, ?, ?, ?, ?)", [data.user_id, data.account_id, data.transaction_type, data.amount, data.currency, data.description, data.reference]);
    return result;
}
export async function fetchTransactions(fastify, limit, offset) {
    let query = "SELECT * FROM transactions WHERE is_deleted = FALSE";
    if (limit !== null) {
        query += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    const [rows] = await fastify.mysql.query(query);
    return rows.map((row) => normalizeRow(row));
}
export async function fetchTransactionById(fastify, id) {
    const [rows] = await fastify.mysql.execute("SELECT * FROM transactions WHERE id = ? AND is_deleted = FALSE", [id]);
    const data = normalizeRow(rows[0]);
    return data;
}
export async function fetchCountTransactions(fastify) {
    const [rows] = await fastify.mysql.query("SELECT COUNT(*) AS total FROM transactions WHERE is_deleted = FALSE");
    return rows[0].total;
}
export async function putTransaction(fastify, id, data) {
    const [result] = await fastify.mysql.execute("UPDATE transactions SET transaction_type = ?, amount = ?, currency = ?, description = ?, reference = ?, status = ? WHERE id = ?", [data.transaction_type, data.amount, data.currency, data.description, data.reference, data.status, id]);
    return result.affectedRows > 0;
}
export async function deleteTransaction(fastify, id) {
    const [result] = await fastify.mysql.execute("UPDATE transactions SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?", [id]);
    return result.affectedRows > 0;
}
