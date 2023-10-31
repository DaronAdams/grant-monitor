import {useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridFilterModel, GridColDef, GridRowsProp, GridToolbarColumnsButton, GridToolbarFilterButton} from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { grantListEndpoint } from '../constants/endpoints';

const UpdatedGrid = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(grantListEndpoint)
      .then((response) => {
        console.log('Response', response.data.grants);
        setData(response.data.grants);
        setIsLoading(false);
      })
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const rows: GridRowsProp = data.map((row: any) => {
    return {
      grant: row.account, // Use the 'account' property for the 'grant' value
      owner: row.sponsor,
      startDate: new Date(row.startDate),
      endDate: new Date(row.endDate),
      moneyAllocated: row.totalAmount,
      moneySpent: 0, // You can set this to the initial value you want
      grantStatus: row.status,
      id: row.id,
    };
  })

  rows.forEach((row) => {
    const currentDate = new Date(); // Get the current date
    const totalDuration = (row.endDate as any - row.startDate as any) / (1000 * 60 * 60 * 24); // Total duration in days
    const elapsedDuration = (currentDate as any - row.startDate as any) / (1000 * 60 * 60 * 24); // Elapsed duration in days
    if (elapsedDuration < 0) {
      row.progress = 0; // Start date is in the future, set progress to 0%
    } else if (elapsedDuration > totalDuration) {
      row.progress = 100; // End date has passed, set progress to 100%
    } else {
      row.progress = (elapsedDuration / totalDuration) * 100; // Progress percentage
    }
    row.moneyLeft = row.moneyAllocated - row.moneySpent;
  });



  function applyFilters(data: GridRowsProp,filterModel: GridFilterModel): GridRowsProp {
    let filteredData: GridRowsProp = [...data];
    filterModel.items.forEach((filterItem) => {
      const { field, value, operator} = filterItem;
      if (filterItem.operator === 'equals') {
        filteredData = filteredData.filter((row) => row[field] === filterItem.value);
      } 

      if (filterItem.operator === 'contains') {
        const searchValue = filterItem.value.toString().toLowerCase();
        filteredData = filteredData.filter((row) =>
          row[field].toString().toLowerCase().includes(searchValue),
        );
      }
    });
    return filteredData;
  }

  const [filterModel, setFilterModel] = useState<GridFilterModel>({items: []});
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

    const exportDataAsCSV = (data: Array<{[key:string]:any}>) => {
      const formattedData = data.map((row) => ({
        Grant: row.grant,
        PI: row.owner,
        StartDate: row.startDate.toLocaleDateString('en-GB'),
        EndDate: row.endDate.toLocaleDateString('en-GB'),
        Progress: `${row.progress.toFixed(2)}%`,
        MoneyAllocated: `$${row.moneyAllocated}`,
        MoneySpent: `$${row.moneySpent}`,
        MoneyLeft: `$${row.moneyLeft}`,
        GrantStatus: row.grantStatus,
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

      exportDataAsCSV(dataToExport as Array<{[key:string]: any}>);

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
        Grant: row.grant,
        PI: row.owner,
        StartDate: row.startDate.toLocaleDateString('en-GB'),
        EndDate: row.endDate.toLocaleDateString('en-GB'),
        Progress: `${row.progress.toFixed(2)}%`,
        MoneyAllocated: `$${row.moneyAllocated}`,
        MoneySpent: `$${row.moneySpent}`,
        MoneyLeft: `$${row.moneyLeft}`,
        GrantStatus: row.grantStatus,
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
    {field: 'grant', headerName: 'Grant', width: 100},
    {field: 'owner', headerName: 'PI', width: 150},
    {field: 'startDate', headerName: 'Start Date', width: 150},
    {field: 'endDate', headerName: 'End Date', width: 150},
    {field: 'progress',headerName: 'Progress',width: 200,
      renderCell: (params) => (
        <div style={{ width: '100%', backgroundColor: 'lightgray', padding: '2px', borderRadius: '5px' }}>
          <div
            style={{
              width: `${params.value}%`,
              backgroundColor: 'green',
              height: '100%',
              borderRadius: '5px',
            }}
          >
            {params.value.toFixed(2)}%
          </div>
        </div>
      ),
    },
    {field: 'moneyAllocated', headerName: 'Money Allocated', valueFormatter: (params) => `$${params.value}`, width: 150},
    {field: 'moneySpent', headerName: 'Money Spent', valueFormatter: (params) => `$${params.value}`, width: 150},
    {field: 'moneyLeft', headerName: 'Money Left', valueFormatter: (params) => `$${params.value}`, width: 150},
    {field: 'grantStatus', headerName: 'Status',type:'singleSelect', valueOptions: ['Grant Finished', 'In Progress', 'Grant Not Started'], width: 150}, 
  ];




  return (
    <div style={{ height: '100%', width: '100%' }}>
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

export default UpdatedGrid;
