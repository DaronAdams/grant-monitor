import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { grantEmployeeGridRowDataListState } from '../../state/grantEmployeeGridRow/atom';
import { grantEmployeeGridRowListEndpoint } from '../../constants/endpoints';

/* 
 Custom hook to call grant list api and set that value to the global state using recoil state
*/
const useGrantEmployeeGridRowListData = (grantId: number) => {  
  const [, setGrantEmployeeGridRowListData] = useRecoilState(grantEmployeeGridRowDataListState);
  const [employeeRowsLoading, setEmployeeRowsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(grantEmployeeGridRowListEndpoint, { params: { grantID: grantId } });
        setGrantEmployeeGridRowListData(response.data.grantEmployeeGridRows);
      } catch (error) {
        console.error('Error fetching grant employee list data:', error);
      } finally {
        setEmployeeRowsLoading(false);
      }
    };

    if (grantId) {
      fetchData();
    }
  }, [grantId, setGrantEmployeeGridRowListData]);

  return { employeeRowsLoading };
};

export default useGrantEmployeeGridRowListData;