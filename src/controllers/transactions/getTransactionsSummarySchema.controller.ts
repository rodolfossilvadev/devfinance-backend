import type {
  FastifyReply,
  FastifyRequest,
  RouteGenericInterface,
} from "fastify";
import type { GetTransactionsSummaryQuery } from "../../schemas/transaction.schema";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import prisma from "../../config/prisma";
import { CategorySummary } from "../../types/category.types";
import { TransectionType } from "@prisma/client";
import { TransactionSummary } from "../../types/transaction.type";

dayjs.extend(utc);

interface GetTransactionsSummaryRoute extends RouteGenericInterface {
  Querystring: GetTransactionsSummaryQuery;
}

export const getTransactionsSummary = async (
  request: FastifyRequest<GetTransactionsSummaryRoute & { userId?: string }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário não autenticado" });
  }

  const { month, year } = request.query;

  if (!month || !year) {
    reply.status(400).send({ error: "Mês e ano são obrigatórios!" });
    return;
  }

  const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = dayjs.utc(startDate).endOf("month").toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    });

    let totalExpenses = 0;
    let totalIncomes = 0;
    const groupedExpenses = new Map<string, CategorySummary>();
    const groupedIncomes = new Map<string, CategorySummary>();

    for (const transaction of transactions) {
      if (transaction.type === TransectionType.expense) {
        if (!transaction.category) continue;

        const existing = groupedExpenses.get(transaction.categoryId) ?? {
          categoryId: transaction.categoryId,
          categoryName: transaction.category.name,
          categoryColor: transaction.category.color,
          amount: 0,
          percentage: 0,
        };

        existing.amount += transaction.amount;
        groupedExpenses.set(transaction.categoryId, existing);
        totalExpenses += transaction.amount;
      } else if (transaction.type === TransectionType.income) {
        if (!transaction.category) continue;

        const existing = groupedIncomes.get(transaction.categoryId) ?? {
          categoryId: transaction.categoryId,
          categoryName: transaction.category.name,
          categoryColor: transaction.category.color,
          amount: 0,
          percentage: 0,
        };

        existing.amount += transaction.amount;
        groupedIncomes.set(transaction.categoryId, existing);
        totalIncomes += transaction.amount;
      }
    }

    const summary: TransactionSummary = {
      totalExpenses,
      totalIncomes,
      balance: parseFloat((totalIncomes - totalExpenses).toFixed(2)),
      expenseByCategory: Array.from(groupedExpenses.values())
        .map((entry) => ({
          ...entry,
          percentage:
            totalExpenses === 0
              ? 0
              : parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2)),
        }))
        .sort((a, b) => b.amount - a.amount),
      incomeByCategory: Array.from(groupedIncomes.values())
        .map((entry) => ({
          ...entry,
          percentage:
            totalIncomes === 0
              ? 0
              : parseFloat(((entry.amount / totalIncomes) * 100).toFixed(2)),
        }))
        .sort((a, b) => b.amount - a.amount),
    };

    console.dir(summary, { depth: null });
    reply.send(summary);
  } catch (err) {
    request.log.error("Erro ao buscar transações", err);
    reply.status(500).send({ error: "Erro do servidor!" });
  }
};
