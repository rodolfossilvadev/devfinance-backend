import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import { createTransactionSchema } from "../../schemas/transaction.schema";
import { z } from "zod";

type CreateTransactionInput = z.infer<typeof createTransactionSchema>;

const createTransaction = async (
  request: FastifyRequest<{ Body: CreateTransactionInput }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = request.userId; 

  if (!userId) {
    return reply.status(401).send({ error: "Usuário não autenticado" });
  }

  const { description, amount, date, categoryId, type } = request.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        date,
        categoryId,
        type,
        userId,
      },
    });

    return reply.status(201).send(transaction);
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return reply.status(500).send({ error: "Erro interno ao criar transação" });
  }
};

export default createTransaction;
