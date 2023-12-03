export default interface PaymentAAAAHHH {
    id: number;
    uID: string | null;
    firstName: string | null;
    middleInitial: string | null;
    lastName: string | null;
    type: string;
    earnings_code: number;
    hours: number;
    rate: number;
    frequency: string;
    date: Date;
    // grantBudgetItemId: number;
  }