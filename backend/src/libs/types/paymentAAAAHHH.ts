import { GrantBudgetItem, Employee } from "@prisma/client";

export default interface PaymentAAAAHHH {
    id: number;
    uID: number;
    firstName: string;
    middleInitial: string;
    lastName: string;
    type: string;
    earnings_code: number;
    hours: number;
    rate: number;
    frequency: string;
    date: Date;
    grantBudgetItemId: number;
  }