export declare const getAllAccountsSchema: {
    readonly description: "Retrieve all accounts";
    readonly tags: readonly ["Accounts"];
    readonly querystring: import("@sinclair/typebox").TObject<{
        limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
        page: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    }>;
    readonly response: {
        readonly 200: import("@sinclair/typebox").TObject<{
            data: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                id: import("@sinclair/typebox").TInteger;
                name: import("@sinclair/typebox").TString;
                createdAt: import("@sinclair/typebox").TString;
                updatedAt: import("@sinclair/typebox").TString;
            }>>;
            total: import("@sinclair/typebox").TInteger;
            page: import("@sinclair/typebox").TInteger;
            pages: import("@sinclair/typebox").TInteger;
            limit: import("@sinclair/typebox").TInteger;
        }>;
    };
};
export declare const createAccountSchema: {
    readonly description: "Create a new account";
    readonly tags: readonly ["Accounts"];
    readonly body: import("@sinclair/typebox").TObject<{
        name: import("@sinclair/typebox").TString;
    }>;
    readonly response: {
        readonly 201: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TInteger;
        }>;
    };
};
export declare const getAccountSchema: {
    readonly description: "Retrieve an account by ID";
    readonly tags: readonly ["Accounts"];
    readonly params: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
    }>;
    readonly response: {
        readonly 200: import("@sinclair/typebox").TObject<{
            id: import("@sinclair/typebox").TInteger;
            name: import("@sinclair/typebox").TString;
            createdAt: import("@sinclair/typebox").TString;
            updatedAt: import("@sinclair/typebox").TString;
        }>;
    };
};
export declare const deleteAccountSchema: {
    readonly description: "Delete an account by ID";
    readonly tags: readonly ["Accounts"];
    readonly params: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
    }>;
    readonly response: {
        readonly 204: {
            readonly description: "La cuenta se eliminó correctamente";
        };
    };
};
export declare const updateAccountSchema: {
    readonly description: "Update an account by ID";
    readonly tags: readonly ["Accounts"];
    readonly params: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
    }>;
    readonly body: import("@sinclair/typebox").TObject<{
        name: import("@sinclair/typebox").TString;
    }>;
    readonly response: {
        readonly 204: {
            readonly description: "La cuenta se actualizó correctamente";
        };
    };
};
