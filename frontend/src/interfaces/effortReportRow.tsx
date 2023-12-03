export default interface EffortReportRow {
    id: number;
    academicYearEffort: number;
    costShareEffort: number;
    summerEffort: number;
    credit: number;
  
    startDate: Date;
    endDate? : Date | null;
  
    isCoPI: boolean;

    firstName: string | null,
    lastName: string | null,
    index: number,
    account: string,
    sponsor: string,
    cayuse: string,
    nceAppDate?: Date | null,

    piLastName: string | null | undefined,
}