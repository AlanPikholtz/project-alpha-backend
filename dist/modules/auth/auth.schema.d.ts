export declare const registerSchema: {
    readonly description: "Register a new user in the system.";
    readonly summary: "User registration";
    readonly tags: readonly ["Auth"];
    readonly body: import("@sinclair/typebox").TObject<{
        username: import("@sinclair/typebox").TString;
        password: import("@sinclair/typebox").TString;
    }>;
    readonly response: {
        readonly 201: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TInteger;
        }>;
    };
};
export declare const loginSchema: {
    readonly description: "Authenticate a user and return JWT tokens for session management.";
    readonly summary: "User login";
    readonly tags: readonly ["Auth"];
    readonly body: import("@sinclair/typebox").TObject<{
        username: import("@sinclair/typebox").TString;
        password: import("@sinclair/typebox").TString;
    }>;
    readonly response: {
        readonly 200: import("@sinclair/typebox").TObject<{
            accessToken: import("@sinclair/typebox").TString;
            refreshToken: import("@sinclair/typebox").TString;
        }>;
    };
};
export declare const refreshSchema: {
    readonly description: "Generates and return new JWT tokens for session management.";
    readonly summary: "Refresh token";
    readonly tags: readonly ["Auth"];
    readonly body: import("@sinclair/typebox").TObject<{
        refreshToken: import("@sinclair/typebox").TString;
    }>;
    readonly response: {
        readonly 200: import("@sinclair/typebox").TObject<{
            accessToken: import("@sinclair/typebox").TString;
            refreshToken: import("@sinclair/typebox").TString;
        }>;
    };
};
