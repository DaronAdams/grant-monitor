import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { grantPIGridRowDataListState } from '../../state/grantPIGridRow/atom';
import { grantPIGridRowListEndpoint } from '../../constants/endpoints';

/* 
 Custom hook to call grant list api and set that value to the global state using recoil state
*/
const useGrantPIGridRowListData = (grantId: number) => {  
  const [, setGrantPIGridRowListData] = useRecoilState(grantPIGridRowDataListState);
  const [piRowsLoading, setPiRowsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(grantPIGridRowListEndpoint, { params: { grantID: grantId } });
        setGrantPIGridRowListData(response.data.grantPiGridRows);
      } catch (error) {
        console.error('Error fetching grant pi list data:', error);
      } finally {
        setPiRowsLoading(false);
      }
    };

    if (grantId) {
      fetchData();
    }

  }, [grantId, setGrantPIGridRowListData]);

  return { piRowsLoading };
};

export default useGrantPIGridRowListData;