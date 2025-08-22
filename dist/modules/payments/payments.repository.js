import { normalizeRow } from "../../utils/db.js";
export async function insertPayment(fastify, data) {
    const [result] = await fastify.mysql.execute("INSERT INTO payments (user_id, account_id, payment_method, amount, currency, description, external_reference) VALUES (?, ?, ?, ?, ?, ?, ?)", [data.user_id, data.account_id, data.payment_method, data.amount, data.currency, data.description, data.external_reference]);
    return result;
}
export async function fetchPayments(fastify, limit, offset) {
    let query = "SELECT * FROM payments WHERE is_deleted = FALSE";
    if (limit !== null) {
        query += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    const [rows] = await fastify.mysql.query(query);
    return rows.map((row) => normalizeRow(row));
}
export async function fetchPaymentById(fastify, id) {
    const [rows] = await fastify.mysql.execute("SELECT * FROM payments WHERE id = ? AND is_deleted = FALSE", [id]);
    const data = normalizeRow(rows[0]);
    return data;
}
export async function fetchCountPayments(fastify) {
    const [rows] = await fastify.mysql.query("SELECT COUNT(*) AS total FROM payments WHERE is_deleted = FALSE");
    return rows[0].total;
}
export async function putPayment(fastify, id, data) {
    const [result] = await fastify.mysql.execute("UPDATE payments SET payment_method = ?, amount = ?, currency = ?, description = ?, status = ?, external_reference = ? WHERE id = ?", [data.payment_method, data.amount, data.currency, data.description, data.status, data.external_reference, id]);
    return result.affectedRows > 0;
}
export async function deletePayment(fastify, id) {
    const [result] = await fastify.mysql.execute("UPDATE payments SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?", [id]);
    return result.affectedRows > 0;
}
