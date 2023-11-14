
export default interface GrantPiBridge {
    id: number;
    academicYearEffort: number;
    costShareEffort: number;
    summerEffort: number;
    credit: number;
  
    startDate: Date;
    endDate? : Date | null;
  
    isCoPI: boolean;
  
    grantId: number;
    employeeId: number;
  }