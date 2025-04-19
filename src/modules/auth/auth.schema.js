export const registerSchema = {
  description: "Register a new user in the system.",
  summary: "User registration",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: {
        type: "string",
        errorMessage: {
          type: "El nombre de usuario debe ser un string.",
        },
      },
      password: {
        type: "string",
        minLength: 8,
        errorMessage: {
          type: "La contraseña debe ser un string.",
          minLength: "La contraseña debe tener al menos 8 caracteres.",
        },
      },
    },
    errorMessage: {
      required: {
        username: "El nombre de usuario es obligatorio.",
        password: "La contraseña es obligatoria.",
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};

export const loginSchema = {
  description:
    "Authenticate a user and return JWT tokens for session management.",
  summary: "User login",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: {
        type: "string",
        errorMessage: {
          type: "El nombre de usuario debe ser un string.",
        },
      },
      password: {
        type: "string",
      },
    },
    errorMessage: {
      required: {
        username: "El nombre de usuario es obligatorio.",
        password: "La contraseña es obligatoria.",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
    },
  },
};

export const refreshSchema = {
  description: "Generates and return new JWT tokens for session management.",
  summary: "Refresh token",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["refreshToken"],
    properties: {
      refreshToken: {
        type: "string",
        errorMessage: {
          type: "El refresh token debe ser un string.",
        },
      },
    },
    errorMessage: {
      required: {
        refreshToken: "El refresh token es obligatorio.",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
    },
  },
};
