export declare const getAllPaymentsSchema: {
    readonly description: "Retrieve all payments";
    readonly tags: readonly ["Payments"];
};
export declare const getPaymentSchema: {
    readonly description: "Retrieve a payment by ID";
    readonly tags: readonly ["Payments"];
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
export declare const createPaymentSchema: {
    readonly description: "Create a new payment";
    readonly tags: readonly ["Payments"];
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["account_id", "payment_method", "amount", "currency", "description"];
        readonly properties: {
            readonly account_id: {
                readonly type: "integer";
            };
            readonly payment_method: {
                readonly type: "string";
                readonly enum: readonly ["card", "bank_transfer", "cash"];
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
            readonly external_reference: {
                readonly type: "string";
            };
        };
    };
};
export declare const updatePaymentSchema: {
    readonly description: "Update a payment";
    readonly tags: readonly ["Payments"];
};
export declare const deletePaymentSchema: {
    readonly description: "Delete a payment";
    readonly tags: readonly ["Payments"];
};
