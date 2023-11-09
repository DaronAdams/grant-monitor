import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { grantDataListState } from '../../state/grants/atom';
import { grantListEndpoint } from '../../constants/endpoints';

/* 
 Custom hook to call grant list api and set that value to the global state using recoil state
*/
const useGrantListData = () => {  
  const [grantListData, setGrantListData] = useRecoilState(grantDataListState);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(grantListEndpoint);
        setGrantListData(response.data.grants);
      } catch (error) {
        console.error('Error fetching grant list data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setGrantListData]);

  return { isLoading };
};

export default useGrantListData;