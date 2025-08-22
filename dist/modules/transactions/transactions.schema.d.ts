export declare const getAllTransactionsSchema: {
    readonly description: "Retrieve all transactions";
    readonly tags: readonly ["Transactions"];
    readonly querystring: {
        readonly type: "object";
        readonly properties: {
            readonly limit: {
                readonly type: "integer";
                readonly minimum: 0;
            };
            readonly page: {
                readonly type: "integer";
                readonly minimum: 1;
            };
        };
    };
};
export declare const getTransactionSchema: {
    readonly description: "Retrieve a transaction by ID";
    readonly tags: readonly ["Transactions"];
    readonly params: {
        readonly type: "object";
        readonly required: readonly ["id"];
        readonly properties: {
            readonly id: {
                readonly type: "integer";
                readonly minimum: 1;
            };
        };
    };
};
export declare const createTransactionSchema: {
    readonly description: "Create a new transaction";
    readonly tags: readonly ["Transactions"];
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["account_id", "transaction_type", "amount", "currency", "description", "reference"];
        readonly properties: {
            readonly account_id: {
                readonly type: "integer";
            };
            readonly transaction_type: {
                readonly type: "string";
                readonly enum: readonly ["deposit", "withdrawal", "transfer"];
            };
            readonly amount: {
                readonly type: "string";
            };
            readonly currency: {
                readonly type: "string";
            };
            readonly description: {
                readonly type: "string";
            };
            readonly reference: {
                readonly type: "string";
            };
        };
    };
};
export declare const updateTransactionSchema: {
    readonly description: "Update a transaction";
    readonly tags: readonly ["Transactions"];
    readonly params: {
        readonly type: "object";
        readonly required: readonly ["id"];
        readonly properties: {
            readonly id: {
                readonly type: "integer";
                readonly minimum: 1;
            };
        };
    };
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly transaction_type: {
                readonly type: "string";
                readonly enum: readonly ["deposit", "withdrawal", "transfer"];
            };
            readonly amount: {
                readonly type: "string";
            };
            readonly currency: {
                readonly type: "string";
            };
            readonly description: {
                readonly type: "string";
            };
            readonly reference: {
                readonly type: "string";
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["pending", "completed", "failed", "cancelled"];
            };
        };
    };
};
export declare const deleteTransactionSchema: {
    readonly description: "Delete a transaction";
    readonly tags: readonly ["Transactions"];
    readonly params: {
        readonly type: "object";
        readonly required: readonly ["id"];
        readonly properties: {
            readonly id: {
                readonly type: "integer";
                readonly minimum: 1;
            };
        };
    };
};
