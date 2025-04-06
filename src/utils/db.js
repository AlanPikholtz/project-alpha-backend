import Decimal from "decimal.js";
import { DateTime } from "luxon";

function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

export function normalizeRow(row) {
  const dateKeys = ["created_at", "updated_at", "assigned_at", "date"];
  const decimalKeys = [
    "balance",
    "commission",
    "amount",
    "commission_amount",
    "client_balance",
  ];

  if (!row) return row;

  const result = {};

  for (const key in row) {
    const camelKey = toCamelCase(key);
    const value = row[key];

    if (value === null) {
      result[camelKey] = null;
    } else if (dateKeys.includes(key) && typeof value === "string") {
      result[camelKey] = DateTime.fromSQL(value, { zone: "utc" }).toISO();
    } else if (decimalKeys.includes(key) && typeof value === "string") {
      result[camelKey] = new Decimal(value);
    } else {
      result[camelKey] = value;
    }
  }

  return result;
}
