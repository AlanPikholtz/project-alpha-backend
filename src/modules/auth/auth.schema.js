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
          type: "Username must be a string.",
        },
      },
      password: {
        type: "string",
        minLength: 8,
        errorMessage: {
          type: "Password must be a string.",
          minLength: "Password must be at least 8 characters long.",
        },
      },
    },
    errorMessage: {
      required: {
        username: "Username is required.",
        password: "Password is required.",
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
          type: "Username must be a string.",
        },
      },
      password: {
        type: "string",
      },
    },
    errorMessage: {
      required: {
        username: "Username is required.",
        password: "Password is required.",
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
          type: "Refresh token must be a string.",
        },
      },
    },
    errorMessage: {
      required: {
        refreshToken: "Refresh token is required.",
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
