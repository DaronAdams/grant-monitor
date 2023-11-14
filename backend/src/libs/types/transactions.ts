import { User } from "@prisma/client";

export default interface Transaction {
    id: number;
    amount: number;
    date: Date;

  }

 export default interface CreateTransactionInput {
    amount: number;
    date: Date;
    
  }