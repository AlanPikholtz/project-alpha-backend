import { createAccountHandler, deleteAccountHandler, getAccountHandler, getAllAccountsHandler, updateAccountHandler, } from "./accounts.controller.js";
import { createAccountSchema, deleteAccountSchema, getAccountSchema, getAllAccountsSchema, updateAccountSchema, } from "./accounts.schema.js";
export default async function accountRoutes(fastify) {
    fastify.get("/accounts", { schema: getAllAccountsSchema, preValidation: [fastify.authenticate] }, getAllAccountsHandler);
    fastify.get("/accounts/:id", {
        schema: getAccountSchema,
        preValidation: [fastify.authenticate],
    }, getAccountHandler);
    fastify.delete("/accounts/:id", {
        schema: deleteAccountSchema,
        preValidation: [fastify.authenticate],
    }, deleteAccountHandler);
    fastify.post("/accounts", { schema: createAccountSchema, preValidation: [fastify.authenticate] }, createAccountHandler);
    fastify.put("/accounts/:id", {
        schema: updateAccountSchema,
        preValidation: [fastify.authenticate],
    }, updateAccountHandler);
}
