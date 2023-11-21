export type StatusType = 'Approved' | 'Received' | 'Completed';

export interface StatusInterface {
  Approved: StatusType,
  Received: StatusType,
  Completed: StatusType
}
export default interface GrantData {
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
  }



