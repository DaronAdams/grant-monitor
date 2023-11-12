import { Grant, Employee } from "@prisma/client";

export default interface GrantEmployeeBridge {
    id: number;
    rate: number;
    effort: number;
  
    startDate: Date;
    endDate?: Date | null;
  
    grantId: number;
    employeeId: number;
  }