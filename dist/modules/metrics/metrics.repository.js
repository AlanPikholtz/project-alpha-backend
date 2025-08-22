import { normalizeRow } from "../../utils/db.js";
export async function insertMetric(fastify, data) {
    const [result] = await fastify.mysql.execute("INSERT INTO metrics (user_id, metric_type, metric_value, metric_date, description) VALUES (?, ?, ?, ?, ?)", [data.user_id, data.metric_type, data.metric_value, data.metric_date, data.description]);
    return result;
}
export async function fetchMetrics(fastify, limit, offset) {
    let query = "SELECT * FROM metrics";
    if (limit !== null) {
        query += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    const [rows] = await fastify.mysql.query(query);
    return rows.map((row) => normalizeRow(row));
}
export async function fetchMetricById(fastify, id) {
    const [rows] = await fastify.mysql.execute("SELECT * FROM metrics WHERE id = ?", [id]);
    const data = normalizeRow(rows[0]);
    return data;
}
export async function fetchCountMetrics(fastify) {
    const [rows] = await fastify.mysql.query("SELECT COUNT(*) AS total FROM metrics");
    return rows[0].total;
}
export async function putMetric(fastify, id, data) {
    const [result] = await fastify.mysql.execute("UPDATE metrics SET metric_type = ?, metric_value = ?, metric_date = ?, description = ? WHERE id = ?", [data.metric_type, data.metric_value, data.metric_date, data.description, id]);
    return result.affectedRows > 0;
}
export async function deleteMetric(fastify, id) {
    const [result] = await fastify.mysql.execute("DELETE FROM metrics WHERE id = ?", [id]);
    return result.affectedRows > 0;
}
