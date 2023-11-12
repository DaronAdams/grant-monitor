import { Grant } from "@prisma/client";

export default interface GrantBudgetItem {
    id: number;
    name: string;
    balance: number;
    commitment: string;
    spent: number;
    account: string;
    category: string;
    grantId: number;
}