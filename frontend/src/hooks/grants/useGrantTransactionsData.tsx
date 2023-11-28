import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { grantTransactionsState } from '../../state/grantTransactions/atom';
import { grantTransactions } from '../../constants/endpoints';


const useGrantTransactionData = (id: number) => {
  const [grantTransactionsData, setGrantTransactionsData] = useRecoilState(grantTransactionsState);
  const [grantTransactionsLoading, setGrantTransactionsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch grant transaction per month data
        const response = await axios.get(grantTransactions, { params: { grantID: id } });
        setGrantTransactionsData(response.data.newGrantTransactionsData);
  
          
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setGrantTransactionsLoading(false);
      }
    };
  
    fetchData();
  }, [setGrantTransactionsData]); 
  
  return { grantTransactionsLoading };
};
  
export default useGrantTransactionData;