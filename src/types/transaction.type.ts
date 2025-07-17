import { TransectionType } from "@prisma/client"
import type { CategorySummary } from "./category.types"


export interface TransactionFilter {
    userId: string,
    date?: {
        gte: Date
        lte: Date
    },
    type?: TransectionType,
    categoryId?: string,
};

export interface TransactionSummary {
    totalExpenses: number,
    totalIncomes: number,
    balance: number,
    expenseByCategory: CategorySummary[],
    incomeByCategory: CategorySummary[],

};

