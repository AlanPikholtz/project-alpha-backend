export const getAllPaymentsSchema = {
  description: "Retrieve all payments",
  tags: ["Payments"],
  querystring: {
    type: "object",
    properties: {
      limit: {
        type: "integer",
        minimum: 0,
        description: "Max number of payments to return (0 = all)",
      },
      page: {
        type: "integer",
        minimum: 0,
        description: "Number of page",
      },
    },
  },
  response: {
    200: {
      description: "List of payments",
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              paymentRequestDate: { type: "string", format: "date-time" },
              amount: { type: "string" },
              currency: { type: "string" },
              method: { type: "string" },
              clientId: { type: "integer" },
              clientCode: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
            },
          },
        },
        page: { type: "integer" },
        limit: { type: "integer" },
        total: { type: "integer" },
        pages: { type: "integer" },
      },
    },
  },
};

export const createPaymentSchema = {
  description: "Create a payment",
  tags: ["Payments"],
  body: {
    type: "object",
    required: [
      "paymentRequestDate",
      "method",
      "amount",
      "currency",
      "clientId",
    ],
    properties: {
      paymentRequestDate: {
        type: "string",
        format: "date-time",
        description: "DateTime of the payment",
        errorMessage: {
          type: "La fecha debe ser un string.",
          format: "La fecha debe ser una cadena de fecha ISO 8601.",
        },
      },
      method: {
        type: "string",
        enum: ["cash", "card", "transfer"],
        description: "Payment method",
        errorMessage: {
          type: "El metodo de pago debe ser un string.",
          enum: "El metodo de pago debe ser [cash] | [card] | [transfer].",
        },
      },
      amount: {
        type: "number",
        minimum: 0.01,
        description: "Payment amount",
        errorMessage: {
          type: "La cantidad del pago debe ser un número.",
          minimum: "La cantidad del pago debe ser >= 0.01.",
        },
      },
      currency: {
        type: "string",
        enum: ["ARS"],
        description: "Payment currency",
        errorMessage: {
          type: "La moneda del pago debe ser un string.",
          enum: "La moneda del pago debe ser [ARS].",
        },
      },
      clientId: {
        type: "integer",
        description: "Client ID",
        errorMessage: {
          type: "El ID del cliente debe ser un número entero.",
        },
      },
    },
    errorMessage: {
      required: {
        paymentRequestDate: "La fecha es obligatoria.",
        method: "El tipo es obligatorio.",
        amount: "La cantidad es obligatoria.",
        currency: "La moneda es obligatoria.",
        clientId: "El ID del cliente es obligatorio.",
      },
    },
  },
  response: {
    201: {
      description: "Payment created successfully",
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};

export const deletePaymentSchema = {
  description: "Delete a payment",
  tags: ["Payments"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer", minimum: 1, description: "Payment ID" },
    },
  },
  response: {
    204: {
      description: "El pago se eliminó correctamente",
    },
  },
};
