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
        const response = await axios.get(grantTransactions.replace(':id', id.toString()));
        setGrantTransactionsData(response.data.expenses);
        console.log('Backend Response:', response.data);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setGrantTransactionsLoading(false);
      }
    };
  
    fetchData();
  }, [id, setGrantTransactionsData]); 
  
  return { grantTransactionsLoading };
};
  
export default useGrantTransactionData;