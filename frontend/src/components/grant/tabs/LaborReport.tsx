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
import { useState } from 'react';
import { Typography, Progress } from '@material-tailwind/react'

interface GrantMainTabProps {
  grantData: GrantData;
}


const LaborReport:React.FC<GrantMainTabProps> = ({grantData}) => {

  // design notes
  /*

  Column Headers:
  Earnings Code - 3 digit integer
  * Benefit Code - ?? [blank column]
  Hours - float.2f [our example is all 1's]
  Amount - dollar amount .2f 
  Debit or Credit - Single Character (D / C) [our example is all D]
  ID - UID begins with U followed by 8 digits
  Last Name
  First Name 
  Middle Name/Initial
  * Payroll Event - looks to be year of the labor report

  */

  const rows: GridRowsProp = [
    { id: 1, col1: '', col2: '', col3: '1.00', col4: '3650.00', col5: 'D', col6: 'U00001024', col7: 'Phan', col8: 'Vinthuy', col9: 'T', col10: '2023' },
    { id: 2, col1: '', col2: '', col3: '1.00', col4: '3650.00', col5: 'D', col6: 'U00001025', col7: 'Cook', col8: 'Amy', col9: '', col10: '2023' },
    { id: 3, col1: '', col2: '', col3: '1.00', col4: '3650.00', col5: 'D', col6: 'U00001024', col7: 'Phan', col8: 'Vinthuy', col9: 'T', col10: '2023' },
  ];
  
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Earnings Code', width: 150 },
    { field: 'col2', headerName: 'Benefit Code', width: 150 },
    { field: 'col3', headerName: 'Hours', width: 150 },
    { field: 'col4', headerName: 'Amount', width: 150 },
    { field: 'col5', headerName: 'Debit or Credit', width: 150 },
    { field: 'col6', headerName: 'ID', width: 150 },
    { field: 'col7', headerName: 'Last Name', width: 150 },
    { field: 'col8', headerName: 'First Name', width: 150 },
    { field: 'col9', headerName: 'Middle Initial', width: 150 },
    { field: 'col10', headerName: 'Payroll Event', width: 150 },
  ];
  

  return(
    <div>
      <DataGrid rows={rows} columns={columns} />
    </div>
  ) 
}
export default LaborReport;