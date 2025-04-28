import Decimal from "decimal.js";
import { DateTime } from "luxon";
import { normalizeResponse } from "../../utils/response.js";
import { fetchMetrics } from "./metrics.repository.js";

export async function getMetrics(fastify, date) {
  const dt = DateTime.fromISO(date, { zone: "utc" });

  const firstDayOfMonth = dt.startOf("month").toISODate();
  const lastDayOfMonth = dt.endOf("month").toISODate();

  const {
    totalClients,
    clientsPerAccount,
    depositsPerClient,
    commissionsPerClient,
    totalDeposits,
    totalCommissions,
    unassignedDeposits,
  } = await fetchMetrics(fastify, firstDayOfMonth, lastDayOfMonth);

  return normalizeResponse({
    totalClients,
    clientsPerAccount,
    depositsPerClient: depositsPerClient.map((row) => ({
      ...row,
      totalDeposits: row.totalDeposits ? new Decimal(row.totalDeposits) : null,
    })),
    commissionsPerClient: commissionsPerClient.map((row) => ({
      ...row,
      totalCommissions: totalCommissions
        ? new Decimal(row.totalCommissions)
        : null,
    })),
    totalDeposits: totalDeposits ? new Decimal(totalDeposits) : null,
    totalCommissions: totalCommissions ? new Decimal(totalCommissions) : null,
    unassignedDeposits: unassignedDeposits
      ? new Decimal(unassignedDeposits)
      : null,
  });
}
