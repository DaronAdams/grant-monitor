import { GrantBudgetItem, Employee } from "@prisma/client";

export default interface Payment {
    id: number;
    type: string;
    earnings_code: number;
    hours: number;
    rate: number;
    frequency: string;
    date: Date;
    grantBudgetItemId: number;
    employeeId: number;
  }