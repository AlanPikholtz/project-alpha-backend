export const getMetricsSchema = {
  description: "Retrieve metrics",
  tags: ["Metrics"],
  response: {
    200: {
      description: "Metrics retrieved successfully",
      type: "object",
      properties: {
        totalClients: {
          type: "integer",
          description: "Total number of clients",
        },
        clientsPerAccount: {
          type: "array",
          description: "Clients per account",
          items: {
            type: "object",
            properties: {
              accountId: {
                type: "integer",
                description: "Account id",
              },
              accountName: {
                type: "string",
                description: "Account name",
              },
              totalClients: {
                type: "integer",
                description: "Total number of clients for the account",
              },
            },
          },
        },
        depositsPerClient: {
          type: "array",
          description: "Total deposits per client",
          items: {
            type: "object",
            properties: {
              clientId: {
                type: "integer",
                description: "Client id",
              },
              clientFullName: {
                type: "string",
                description: "Client name",
              },
              totalDeposits: {
                type: "integer",
                description: "Total deposits for the client",
              },
            },
          },
        },
        commissionsPerClient: {
          type: "array",
          description: "Total commissions per client",
          items: {
            type: "object",
            properties: {
              clientId: {
                type: "integer",
                description: "Client id",
              },
              clientFullName: {
                type: "string",
                description: "Client name",
              },
              totalCommissions: {
                type: "integer",
                description: "Total commissions from the client",
              },
            },
          },
        },
        totalDeposits: {
          type: "integer",
          description: "Total deposits",
        },
        totalCommissions: {
          type: "integer",
          description: "Total commissions from deposits",
        },
        unassignedDeposits: {
          type: "integer",
          description: "Total unassigned deposits",
        },
      },
    },
  },
};
