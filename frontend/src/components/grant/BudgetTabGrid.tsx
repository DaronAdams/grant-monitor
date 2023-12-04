import {DataGrid,GridToolbarContainer,GridFilterModel,GridColDef,GridRowsProp,GridToolbarColumnsButton,GridToolbarFilterButton,GridRowParams} from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { useState} from 'react';
import { Typography } from '@mui/material';
import GrantBudgetGridRow from '../../interfaces/GrantBudgetGridRow';

interface GrantBudgetTabProps {
    grantBudgetItemData: GrantBudgetGridRow[];
}



const BudgetTabGrid: React.FC<GrantBudgetTabProps> = ({ grantBudgetItemData }) => {

  console.log('Grant Budget item data: ' + grantBudgetItemData);

  /*

  const formatDateMMDDYYYY = (dateStr: any) => {

    const date: Date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month (0-based) + 1
    const day = date.getDate().toString().padStart(2, '0'); // Day
    const year = date.getFullYear(); // Year

    return `${month}/${day}/${year}`;
  }
  */


  const rows: GridRowsProp = grantBudgetItemData.map((row: GrantBudgetGridRow) => {
    return {
      name: row.name,
      balance: row.balance,
      commitment: row.commitment,
      spent: row.spent,
      account: row.account,
      category: row.category,
      id: row.id,
    };
  })

  /*
  const parseDate = (dateStr: string) => {
    const [mm, dd, yyyy] = dateStr.split('/').map(Number);
    return new Date(yyyy, mm - 1, dd); // Month is 0-based, so subtract 1 from mm
  }

  rows.forEach((row) => {
    row.amount = row.hours * row.rate;
  });
  */


  function applyFilters(data: GridRowsProp, filterModel: GridFilterModel): GridRowsProp {
    let filteredData: GridRowsProp = [...data];
    filterModel.items.forEach((filterItem) => {
      const { field, value, operator } = filterItem;
      if (value === undefined || value === null || value === ' ') {
        return;
      }

      if (operator === 'equals') {
        filteredData = filteredData.filter((row) => row[field] == value || row[field][0] == value);
      }

      if (operator === 'contains') {
        const searchValue = value.toString().toLowerCase();
        filteredData = filteredData.filter((row) =>
          row[field].toString().toLowerCase().includes(searchValue),
        );
      }
    });
    return filteredData;
  }

  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
  const [filteredRows, setFilteredRows] = useState(rows);
  const [filterApplied, setFilterApplied] = useState(false);

  const handleFilterModelChange = (newFilterModel: GridFilterModel) => {
    setFilterModel(newFilterModel);
    const filteredData = applyFilters(rows, newFilterModel);
    setFilteredRows(filteredData);

    if (newFilterModel.items.some((item) => item.value !== '')) {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  };

  function CustomToolBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const exportDataAsCSV = (data: Array<{ [key: string]: any }>) => {
      const formattedData = data.map((row) => ({
        name: row.name,
        balance: row.balance,
        commitment: row.commitment,
        spent: row.spent,
        account: row.account,
        category: row.category,
        id: row.id,
      }));

      const csvContent =
                'data:text/csv;charset=utf-8,' +
                [Object.keys(formattedData[0]), ...formattedData.map(Object.values)]
                  .map((row) => row.join(','))
                  .join('\n');

      const encodedUri = encodeURI(csvContent);

      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'data.csv');

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleExportCSV = () => {

      let dataToExport;

      if (filterApplied == true) {
        dataToExport = filteredRows;
      }
      else {
        dataToExport = rows;
      }

      exportDataAsCSV(dataToExport as Array<{ [key: string]: any }>);

      handleMenuClose();
    };

    const handleExcelExport = () => {

      let dataToExport;

      if (filterApplied == true) {
        dataToExport = filteredRows;
      }
      else {
        dataToExport = rows;
      }

      const rowsForExcelExport = dataToExport.map((row) => ({
        name: row.name,
        balance: row.balance,
        commitment: row.commitment,
        spent: row.spent,
        account: row.account,
        category: row.category,
        id: row.id,
      }));

      const worksheet = XLSX.utils.json_to_sheet(rowsForExcelExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'DataGrid');

      XLSX.writeFile(workbook, 'data.xlsx');
    };

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <IconButton onClick={handleMenuOpen}>
          <SaveAltIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleExportCSV}>Download as CSV</MenuItem>
          <MenuItem onClick={handleExcelExport}>Download as Excel</MenuItem>
        </Menu>
      </GridToolbarContainer>
    );
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 0.75 },
    { field: 'balance', headerName: 'Balance', flex: 0.75 },
    { field: 'commitment', headerName: 'Commitment', flex: 0.75 },
    { field: 'spent', headerName: 'Money Spent', width: 150 },
    { field: 'account', headerName: 'Account', flex: 0.75 },
    { field: 'category', headerName: 'Category', flex: 0.75 },
  ];

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom style={{ textAlign: 'right', paddingRight: '850px', paddingTop: '30px' }}>
                Budget Report

      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        filterModel={filterModel}
        onFilterModelChange={handleFilterModelChange}
        slots={{ toolbar: CustomToolBar }}
      />
    </div>
  );

}
export default BudgetTabGrid;