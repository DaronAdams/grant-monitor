export default interface GrantEmployeeGridRow {
  employeeId: number;
  uID?: string | null;
  firstName?: string | null;
  middleInitial?: string | null;
  lastName?: string | null;  
  rate: number;
  effort: number;
  startDate: Date;
  endDate?: Date | null;
}
