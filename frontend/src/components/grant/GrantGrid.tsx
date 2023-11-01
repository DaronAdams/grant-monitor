import { DataGrid, GridToolbarContainer, GridFilterModel, GridColDef, GridRowsProp, GridToolbarColumnsButton, GridToolbarFilterButton, GridRowParams} from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import GrantData from '../../interfaces/GrantData'
import { useState } from 'react';
import { Typography } from '@material-tailwind/react'


interface UpdatedGridProps {
  openSubpage: (grantData: GrantData) => void;
  allGrantsData: GrantData[];
}

const UpdatedGrid: React.FC<UpdatedGridProps> = ({ openSubpage, allGrantsData}) => {


  /*
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  */

  const findItemById = (id: number) => {
    return allGrantsData.find(dataItem => dataItem.id === id);
  };

  const handleRowClick = (params: GridRowParams) => {
    const id = parseInt(params.id.toString())
    const grantData: GrantData | undefined = findItemById(id);
    console.log(grantData);

    if (grantData) {
      openSubpage(grantData);
    } else {
      console.error('what the heck i couldnt get the grant data for ' + id);
    }
  };

  const formatDateMMDDYYYY = (dateStr: any) => {

    const date: Date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month (0-based) + 1
    const day = date.getDate().toString().padStart(2, '0'); // Day
    const year = date.getFullYear(); // Year

    return `${month}/${day}/${year}`;
  }

  const rows: GridRowsProp = allGrantsData.map((grantDataObject: GrantData) => {
    return {
      grant: grantDataObject.account, // Use the 'account' property for the 'grant' value
      owner: grantDataObject.sponsor,
      startDate: formatDateMMDDYYYY(grantDataObject.startDate),
      endDate: formatDateMMDDYYYY(grantDataObject.endDate),
      moneyAllocated: grantDataObject.totalAmount,
      moneySpent: 50000, // You can set this to the initial value you want
      grantStatus: grantDataObject.status,
      id: grantDataObject.id,
    };
  })

  const parseDate = (dateStr: string) => {
    const [mm, dd, yyyy] = dateStr.split('/').map(Number);
    return new Date(yyyy, mm - 1, dd); // Month is 0-based, so subtract 1 from mm
  }

  rows.forEach((row) => {
    const currentDate = new Date(); // Get the current date

    const startDate: Date = parseDate(row.startDate);
    const endDate: Date = parseDate(row.endDate);

    const totalDuration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24); // Total duration in days
    const elapsedDuration = (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24); // Elapsed duration in days
    if (elapsedDuration < 0) {
      row.progress = 0; // Start date is in the future, set progress to 0%
    } else if (elapsedDuration > totalDuration) {
      row.progress = 100; // End date has passed, set progress to 100%
    } else {
      row.progress = (elapsedDuration / totalDuration) * 100; // Progress percentage
    }
    row.moneyLeft = row.moneyAllocated - row.moneySpent;

    row.moneyProgress = [(row.moneySpent / row.moneyAllocated) * 100, row.moneySpent / 1000, row.moneyLeft / 1000];
    console.log(row.moneyProgress);
  });



  function applyFilters(data: GridRowsProp,filterModel: GridFilterModel): GridRowsProp {
    let filteredData: GridRowsProp = [...data];
    filterModel.items.forEach((filterItem) => {
      const { field, value, operator} = filterItem;
      if (value === undefined || value === null || value === ' '){
        return;
      }

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
    {field: 'grant', headerName: 'Grant', flex: 1},
    {field: 'owner', headerName: 'PI', flex: .75},
    {field: 'startDate', headerName: 'Start Date', flex: 1},
    {field: 'endDate', headerName: 'End Date', flex: 1},
    {field: 'progress',headerName: 'Lifetime', flex: 1.75,
      renderCell: (params) => (
        <div style={{ width: '100%', backgroundColor: 'darkgray', padding: '2px', borderRadius: '5px' }}>
          <div
            style={{
              width: `${params.value}%`,
              backgroundColor: `${params.value == 0 && 'darkgray' || 'blue'}`,
              height: '100%',
              borderRadius: '5px',
              padding: '5px',
            }}
          >
            <Typography variant="small" color="white">{params.value.toFixed(0)}%</Typography>
            
          </div>
        </div>
      ),
    },
    {field: 'moneyProgress', headerName: 'Spending', flex: 1.75,
      renderCell: (params) => (
        <div style={{ width: '100%', backgroundColor: 'darkgray', padding: '2px', borderRadius: '5px' }}>
          <div
            style={{
              width: `${params.value[0]}%`,
              backgroundColor: `${params.value[0] == 0 && 'darkgray' || 'green'}`,
              height: '100%',
              borderRadius: '5px',
              padding: '5px',
            }}
          >
            <Typography variant="small" color="white" >${params.value[1].toFixed(2)}K spent, ${params.value[2].toFixed(2)}K left</Typography>            
          </div>
        </div>
      ),
    },
    {field: 'grantStatus', headerName: 'Status',type:'singleSelect', valueOptions: ['Grant Finished', 'In Progress', 'Grant Not Started'], flex: 1},
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      filterModel={filterModel}
      onFilterModelChange={handleFilterModelChange}
      slots={{ toolbar: CustomToolBar }}
      onRowClick={handleRowClick}
    />
  );

}

export default UpdatedGrid;
