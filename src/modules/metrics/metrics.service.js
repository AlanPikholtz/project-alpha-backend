import Decimal from "decimal.js";
import { normalizeResponse } from "../../utils/response.js";
import { fetchMetrics } from "./metrics.repository.js";

export async function getMetrics(mysql) {
  const {
    totalClients,
    clientsPerAccount,
    depositsPerClient,
    commissionsPerClient,
    totalDeposits,
    totalCommissions,
  } = await fetchMetrics(mysql);

  return normalizeResponse({
    totalClients,
    clientsPerAccount,
    depositsPerClient: depositsPerClient.map((row) => ({
      ...row,
      totalDeposits: new Decimal(row.totalDeposits),
    })),
    commissionsPerClient: commissionsPerClient.map((row) => ({
      ...row,
      totalCommissions: new Decimal(row.totalCommissions),
    })),
    totalDeposits: new Decimal(totalDeposits),
    totalCommissions: new Decimal(totalCommissions),
  });
}
