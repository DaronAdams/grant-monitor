import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { effortReportState } from '../../state/effortReport/atom';
import { effortReport } from '../../constants/endpoints';

/* 
 Custom hook to call grant list api and set that value to the global state using recoil state
*/
const usePaymentEmployeeData = () => {  
  const [, setEffortReportData] = useRecoilState(effortReportState);
  const [effortReportLoading, setEffortReportLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(effortReport);
        setEffortReportData(response.data.effortReportRows);
      } catch (error) {
        console.error('Error fetching payment-employee data:', error);
      } finally {
        setEffortReportLoading(false);
      }
    };

    fetchData();

  }, [setEffortReportData]);

  return { effortReportLoading };
};

export default usePaymentEmployeeData;
