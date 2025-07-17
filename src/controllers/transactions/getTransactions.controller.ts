import { FastifyReply, FastifyRequest } from "fastify";
import type { GetTransactionsQuery } from "../../schemas/transaction.schema";
import { TransactionFilter } from "../../types/transaction.type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import prisma from "../../config/prisma";
import { error } from "console";

dayjs.extend(utc);

export const getTransactions = async (
    request: FastifyRequest<{Querystring: GetTransactionsQuery}>, 
    reply: FastifyReply
): Promise<void> => {
      const userId = request.userId; 

        if (!userId) {
          return reply.status(401).send({ error: "Usuário não autenticado" });
         }

    const {month, categoryId, type, year} =request.query;

    const filters: TransactionFilter = { userId };

    if(month && year){
        const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
        const endDate = dayjs.utc(startDate).endOf("month").toDate();
        filters.date = {gte: startDate, lte: endDate};
    };
    if(type){
        filters.type = type
    };
    if(categoryId){
        filters.categoryId = categoryId
    };

    try{
        const transactions = await prisma.transaction.findMany({
            where: filters,
            orderBy: {date: "desc"},
            include:{
                category:{
                    select: {
                        color: true,
                        name:true,
                        type: true,
                    },
                },
            },
        });

        reply.send(transactions);
    }catch(err){
        request.log.error("Erro ao buscar transações", error);
        reply.status(500).send({error:"Erro do servidor!"});
    };
};