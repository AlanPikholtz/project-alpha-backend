import Decimal from "decimal.js";
export function normalizeResponse(data) {
    if (Array.isArray(data)) {
        return data.map(normalizeObject);
    }
    if (typeof data === "object" && data !== null) {
        return normalizeObject(data);
    }
    return data;
}
function normalizeObject(obj) {
    const result = {};
    for (const key in obj) {
        const value = obj[key];
        if (value instanceof Decimal) {
            result[key] = value.toString();
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
