export default interface GrantPIGridRow {
    employeeId: number;
    uID?: string | null;
    firstName?: string | null;
    middleInitial?: string | null;
    lastName?: string | null;  
    academicYearEffort: number;
    costShareEffort: number;
    summerEffort: number;
    credit: number;
    startDate: Date;
    endDate? : Date | null;
    isCoPI: boolean;
  }
  