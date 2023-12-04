import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { grantBudgetGridRowDataListState } from '../../state/grantBudgetGridRow/atom';
import { budgetReport } from '../../constants/endpoints';

/* 
 Custom hook to call grant list api and set that value to the global state using recoil state
*/
const useGrantBudgetGridRowListData = (grantId: number) => {
  const [, setGrantBudgetGridRowListData] = useRecoilState(grantBudgetGridRowDataListState);
  const [budgetRowsLoading, setBudgetRowsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(budgetReport, { params: { grantID: grantId } });
        console.log('Response from backend:', response.data);
        setGrantBudgetGridRowListData(response.data);
      } catch (error) {
        console.error('Error fetching grant employee list data:', error);
      } finally {
        setBudgetRowsLoading(false);
      }
    };

    if (grantId) {
      fetchData();
    }
  }, [grantId, setGrantBudgetGridRowListData]);

  return { budgetRowsLoading };
};

export default useGrantBudgetGridRowListData;