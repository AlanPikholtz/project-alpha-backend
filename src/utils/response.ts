import Decimal from 'decimal.js';

export function normalizeResponse(data: any): any {
  if (Array.isArray(data)) {
    return data.map(normalizeObject);
  }

  if (typeof data === 'object' && data !== null) {
    return normalizeObject(data);
  }

  return data;
}

function normalizeObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];

    if (value instanceof Decimal) {
      result[key] = value.toString();
    } else {
      result[key] = value;
    }
  }

  return result;
}
