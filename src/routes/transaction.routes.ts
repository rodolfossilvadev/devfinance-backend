import type { FastifyInstance } from "fastify";
import { getCategories } from "../controllers/category.controller";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getHistoricalTransactionsSchema,
  getTransactionsSchema,
  getTransactionsSummarySchema,
} from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummarySchema.controller";
import { getHistoricalTransactions } from "../controllers/transactions/getHistoricalTransactions.controller";

const transactionRoutes = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", authMiddleware);

  // CRIAÇÃO
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

  // BUSCAR COM FILTRO
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema),
    },
    handler: getTransactions,
  });

  // BUSCAR O RESUMO
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });
    // HISTORICO DE TRANSAÇÕES
  fastify.route({
    method: "GET",
    url: "/historical",
    schema: {
      querystring: zodToJsonSchema(getHistoricalTransactionsSchema),
    },
    handler: getHistoricalTransactions,
  });


  // DELETAR TRANSAÇÃO
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: zodToJsonSchema(deleteTransactionSchema),
    },
    handler: deleteTransaction,
  });
};

export default transactionRoutes;
