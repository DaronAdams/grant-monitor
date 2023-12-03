import {
  DataGrid,
  GridToolbarContainer,
  GridFilterModel,
  GridColDef,
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import { Typography } from '@mui/material';
import EffortReportRow from '../../interfaces/effortReportRow';
  
interface GrantLaborTabProps {
    effortReportData: EffortReportRow[];
}
  
const EffortReportGrid: React.FC<GrantLaborTabProps> = ({ effortReportData }) => {
  
  const rows: GridRowsProp = effortReportData.map((row: EffortReportRow) => {
    return {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      academicYearEffort: row.academicYearEffort,
      summerEffort: row.summerEffort,
      // month
      costShareEffort: row.costShareEffort,
      credit: row.credit,
      // grant name
      index: row.index,
      sponsor: row.sponsor,
      piLastName: row.piLastName,
      startDate: row.startDate,
      endDate: row.endDate,
      cayuse: row.cayuse,
    };
  })

  const calcMonth = (row: GridValidRowModel) => {

    const summerMonths = row.summerEffort * 0.03;
    const ayMonths = row.academicYearEffort * 0.09

    const totalMonths = summerMonths + ayMonths;

    // Calculate the percentage effort
    const percentEffort = (totalMonths / 12) * 100;

    // Round the result to two decimal places
    const roundedPercentEffort = percentEffort.toFixed(2);

    // Convert the result back to a floating-point number
    return parseFloat(roundedPercentEffort);
  }
  
  rows.forEach((row) => {
    row.month = calcMonth(row);
  });
  
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
        firstName: row.firstName,
        lastName: row.lastName,
        academicYearEffort: row.academicYearEffort,
        summerEffort: row.summerEffort,
        month: row.month,
        costShareEffort: row.costShareEffort,
        credit: row.credit,
        index: row.index,
        sponsor: row.sponsor,
        piLastName: row.piLastName,
        startDate: row.startDate,
        endDate: row.endDate,
        cayuse: row.cayuse,
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
        firstName: row.firstName,
        lastName: row.lastName,
        academicYearEffort: row.academicYearEffort,
        summerEffort: row.summerEffort,
        month: row.month,
        costShareEffort: row.costShareEffort,
        credit: row.credit,
        index: row.index,
        sponsor: row.sponsor,
        piLastName: row.piLastName,
        startDate: row.startDate,
        endDate: row.endDate,
        cayuse: row.cayuse,
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
    { field: 'firstName', headerName: 'First Name', flex: 0.75 },
    { field: 'lastName', headerName: 'Last Name', flex: 0.75 },
    { field: 'academicYearEffort', headerName: 'AY Effort', flex: 0.75 },
    { field: 'summerEffort', headerName: 'S Effort', flex: 0.75 },
    { field: 'month', headerName: 'Month', flex: 0.75 },
    { field: 'costShareEffort', headerName: 'CS Effort', flex: 0.75 },
    { field: 'credit', headerName: 'Credit', flex: 0.75 },
    { field: 'index', headerName: 'Index', flex: 0.75 },
    { field: 'sponsor', headerName: 'Sponsor', flex: 0.75 },
    { field: 'piLastName', headerName: 'PI', flex: 0.75 },
    { field: 'startDate', headerName: 'Start Date', flex: 0.75 },
    { field: 'endDate', headerName: 'End Date', flex: 0.75 },
    { field: 'cayuse', headerName: 'Cayuse', flex: 0.75 },
  ];
  
  return (
    <div>
      
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
export default EffortReportGrid;