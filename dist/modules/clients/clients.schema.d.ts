export declare const getAllClientsSchema: {
    readonly description: "Retrieve all clients";
    readonly tags: readonly ["Clients"];
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
            readonly accountId: {
                readonly type: "integer";
                readonly minimum: 1;
            };
        };
    };
};
export declare const getClientSchema: {
    readonly description: "Retrieve a client by ID";
    readonly tags: readonly ["Clients"];
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
export declare const createClientSchema: {
    readonly description: "Create a new client";
    readonly tags: readonly ["Clients"];
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["firstName", "code", "balance", "accountId"];
        readonly properties: {
            readonly firstName: {
                readonly type: "string";
            };
            readonly lastName: {
                readonly type: "string";
            };
            readonly code: {
                readonly type: "string";
            };
            readonly balance: {
                readonly type: "string";
            };
            readonly commission: {
                readonly type: "string";
            };
            readonly notes: {
                readonly type: "string";
            };
            readonly accountId: {
                readonly type: "integer";
            };
        };
    };
};
export declare const updateClientSchema: {
    readonly description: "Update a client";
    readonly tags: readonly ["Clients"];
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
        readonly required: readonly ["firstName", "commission", "accountId"];
        readonly properties: {
            readonly firstName: {
                readonly type: "string";
            };
            readonly lastName: {
                readonly type: "string";
            };
            readonly commission: {
                readonly type: "string";
            };
            readonly notes: {
                readonly type: "string";
            };
            readonly accountId: {
                readonly type: "integer";
            };
        };
    };
};
export declare const updateClientBalanceSchema: {
    readonly description: "Update client balance";
    readonly tags: readonly ["Clients"];
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
        readonly required: readonly ["balance"];
        readonly properties: {
            readonly balance: {
                readonly type: "string";
            };
        };
    };
};
export declare const deleteClientSchema: {
    readonly description: "Delete a client";
    readonly tags: readonly ["Clients"];
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
export declare const getClientOperationsSchema: {
    readonly description: "Get client operations";
    readonly tags: readonly ["Clients"];
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
            readonly from: {
                readonly type: "string";
            };
            readonly to: {
                readonly type: "string";
            };
            readonly sort: {
                readonly type: "string";
            };
            readonly order: {
                readonly type: "string";
                readonly enum: readonly ["asc", "desc"];
            };
            readonly type: {
                readonly type: "string";
            };
        };
    };
};
