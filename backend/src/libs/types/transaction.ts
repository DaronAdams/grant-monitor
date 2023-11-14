import { GrantBudgetItem, } from "@prisma/client";

export default interface Transaction {
    id: number;
    amount: number;
    date: Date;
    grantBudgetItemId: number  
}