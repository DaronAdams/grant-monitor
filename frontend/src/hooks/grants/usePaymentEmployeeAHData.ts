import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { paymentAHDataListState } from '../../state/payment/atom';
import { laborReport } from '../../constants/endpoints';

/* 
 Custom hook to call grant list api and set that value to the global state using recoil state
*/
const usePaymentEmployeeData = (grantId: number) => {  
  const [, setPaymentEmployeeData] = useRecoilState(paymentAHDataListState);
  const [PaymentEmployeeLoading, setPaymentEmployeeLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(laborReport, { params: { grantID: grantId } });
        setPaymentEmployeeData(response.data.paymentEmployeeData);
      } catch (error) {
        console.error('Error fetching payment-employee data:', error);
      } finally {
        setPaymentEmployeeLoading(false);
      }
    };

    if (grantId) {
      fetchData();
    }

  }, [grantId, setPaymentEmployeeData]);

  return { PaymentEmployeeLoading };
};

export default usePaymentEmployeeData;
