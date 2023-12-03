import { 
  DataGrid,
  GridToolbarContainer,
  GridFilterModel,
  GridColDef,
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridRowParams } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import GrantData from '../../../interfaces/GrantData'
import { useState, useEffect } from 'react';
import { Typography, Progress } from '@material-tailwind/react'
import LaborTabGrid from '../../LaborTabGrid'

import { useRecoilValue } from 'recoil';

import usePaymentEmployeeData from '../../../hooks/grants/usePaymentEmployeeAHData';
import { paymentAHDataListState } from '../../../state/payment/atom';
import PaymentAAAAHHH from '../../../interfaces/paymentAH';


interface GrantMainTabProps {
  grantData: GrantData;
}

const LaborReport:React.FC<GrantMainTabProps> = ({grantData}) => {

  const { PaymentEmployeeLoading } = usePaymentEmployeeData(grantData.id);
  const PaymentEmployeeAHData: PaymentAAAAHHH[] = useRecoilValue(paymentAHDataListState);

  useEffect(() => {
    console.log('Payment Employee Data', PaymentEmployeeAHData);
  }, [PaymentEmployeeAHData]);


  return(
    <LaborTabGrid paymentAHData={PaymentEmployeeAHData} />
  ) 
}
export default LaborReport;