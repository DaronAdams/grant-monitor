//import EmployeeGrid from '../components/employee/EmployeeGrid';
import Subpage from '../components/Subpage';
import NavSpeedDial from '../components/NavSpeedDial';
import { useEffect } from 'react';
// import EmployeeContainer from '../components/employee/EmployeeContainer';
// import EmployeeData from '../interfaces/EmployeeData';
import { Spinner, Typography } from '@material-tailwind/react';
import { useRecoilValue } from 'recoil';
// import useEmployeeListData from '../hooks/employees/useEmployeeListData';
// import { currentEmployeeDataState, employeeDataListState } from '../state/employees/atom';

import useEffortReportData from '../hooks/employees/useEffortReportData'
import { effortReportState } from '../state/effortReport/atom';
import EffortReportRow from '../interfaces/effortReportRow';

//import { Button } from '@mui/material';
import EffortReportGrid from '../components/employee/EffortReportGrid';
//import { useNavigate } from 'react-router-dom';

const Employees = () => {
  // const navigate = useNavigate();

  const { effortReportLoading } = useEffortReportData();
  const effortReportData: EffortReportRow[] = useRecoilValue(effortReportState);
  
  useEffect(() => {
    console.log('Effort Report Data', effortReportData);
  }, [effortReportData]);

  // const openSubpage = (employeeData: ((currVal: null) => null) | null) => {
  //   setEffortReportData(employeeData);
  //   console.log('Current Effort Report Data', employeeData);
  // }

  // const closeSubpage = () => {
  //   setEffortReportData(null);
  // }

  // const handleCreateClick = () => {
  //   navigate('/employee/create')
  // }

  

  return ( 
    <div className="flex flex-row">
      <NavSpeedDial />
      {!effortReportLoading && (
      /* employeeData !== null && (
          <Subpage>
            <EmployeeContainer employeeData={employeeData} closeSubpage={closeSubpage} />
          </Subpage>
        ) || */
        (
          <Subpage>
            <Typography variant="h3" color="blue" style={{ padding: '10px', paddingTop: '20px' }}>University of Memphis Investigators</Typography>
            <Typography variant="h5" style={{ padding: '10px' }}>Effort Report</Typography>
            {/* <div className='px-4'>
              <Button
                onClick={handleCreateClick}
                variant='contained'
              >
                  Create Employee
              </Button>
            </div> */}
            {/* <div className="flex flex-row justify-between items-center p-4"> */}
            <EffortReportGrid effortReportData={effortReportData} />
            {/* </div> */}
          </Subpage>
        )
      ) ||
        (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh'}}>
            <Spinner color="blue" className="flex-grow" />
          </div>
        )}
    </div>
  );
}
 
export default Employees;