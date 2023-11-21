import { User } from "@prisma/client";

type StatusType = 'Approved' | 'Received' | 'Completed';

export default interface Grant {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  index: number;
  fund: string;
  organization: string;
  account: string;
  program: string;
  costShareIndex: number;
  cayuse: string;
  sponsor: string;
  status: StatusType;
  yearlyAmount: number;
  totalAmount: number;
  moneySpent: number;
  startDate: Date;
  endDate: Date;
  nceAppDate?: Date | null;
  notes?: string | null;
  User?: User;
}