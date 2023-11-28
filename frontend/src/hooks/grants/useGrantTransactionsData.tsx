import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { grantTransactionsState } from '../../state/grantTransactions/atom';
import { grantTransactions } from '../../constants/endpoints';


const useGrantTransactionData = () => {
    const [grantTransactionsData, setGrantTransactionsData] = useRecoilState(grantTransactionsState);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch grant transaction per month data
          const grantTransactionsResponse = await axios.get(grantTransactions);
          setGrantTransactionsData(grantTransactionsResponse.data.newGrantTransactionsData);
  
          
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [setGrantTransactionsData]); 
  
    return { isLoading };
  };
  
  export default useGrantTransactionData;