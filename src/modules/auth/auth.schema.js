export const registerSchema = {
  description: "Register a new user in the system.",
  summary: "User registration",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        errorMessage: {
          type: "Email must be a string.",
          format: "Invalid email format.",
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
        email: "Email is required.",
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
    "Authenticate a user and return a JWT token for session management.",
  summary: "User login",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        errorMessage: {
          type: "Email must be a string.",
          format: "Invalid email format.",
        },
      },
      password: {
        type: "string",
      },
    },
    errorMessage: {
      required: {
        email: "Email is required.",
        password: "Password is required.",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
  },
};
