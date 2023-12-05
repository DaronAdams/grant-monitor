import {
  DataGrid,
  GridToolbarContainer,
  GridFilterModel,
  GridColDef,
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridRowParams
} from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import GrantPIGridRow from '../../interfaces/GrantPIGridRow'
import { useState } from 'react';
import { Typography, Progress } from '@material-tailwind/react'


interface GrantPIGridProps {
  //openSubpage: (grantData: any) => void;
  grantPIData: GrantPIGridRow[];
}

const GrantPIGrid: React.FC<GrantPIGridProps> = ({ grantPIData }) => {

  const findItemById = (id: number) => {
    return grantPIData.find(dataItem => dataItem.employeeId === id);
  };

  /*
    const handleRowClick = (params: GridRowParams) => {
        const id = parseInt(params.id.toString())
        const grantData: GrantData | undefined = findItemById(id);
        console.log(grantData)

        if (grantData) {
        openSubpage(grantData);
        }
    };
  */

  const formatDateMMDDYYYY = (dateStr: any) => {

    const date: Date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month (0-based) + 1
    const day = date.getDate().toString().padStart(2, '0'); // Day
    const year = date.getFullYear(); // Year

    return `${month}/${day}/${year}`;
  }

  /*
    academicYearEffort: number;
    costShareEffort: number;
    summerEffort: number;
    credit: number;
    startDate: Date;
    endDate? : Date | null;
    isCoPI: boolean;
   */

  const rows: GridRowsProp = grantPIData.map((row: GrantPIGridRow) => {
    return {
      uID: row.uID,
      firstName: row.firstName,
      lastName: row.lastName,
      academicYearEffort: row.academicYearEffort,
      costShareEffort: row.costShareEffort,
      summerEffort: row.summerEffort,
      credit: row.credit,
      isCoPI: row.isCoPI,
      startDate: formatDateMMDDYYYY(row.startDate),
      endDate: formatDateMMDDYYYY(row.endDate),
      id: row.employeeId,
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
    const progress = (elapsedDuration < 0) && 0 || (elapsedDuration > totalDuration) && 100 || (elapsedDuration / totalDuration) * 100;
    row.timeProgress = [progress, row.startDate, row.endDate]

    row.coPI = row.isCoPI && 'Y' || 'N';
  });

  function applyFilters(data: GridRowsProp, filterModel: GridFilterModel): GridRowsProp {
    let filteredData: GridRowsProp = [...data];
    filterModel.items.forEach((filterItem) => {
      const { field, value, operator } = filterItem;
      if (value === undefined || value === null || value === ' ') {
        return;
      }

      if (filterItem.operator === 'equals') {
        filteredData = filteredData.filter((row) => row[field] == filterItem.value || row[field][0] == filterItem.value);
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
        id: row.employeeId,
        uID: row.uID,
        firstName: row.firstName,
        lastName: row.lastName,
        academicYearEffort: row.academicYearEffort,
        costShareEffort: row.costShareEffort,
        summerEffort: row.summerEffort,
        credit: row.credit,
        isCoPI: row.coPI,
        startDate: formatDateMMDDYYYY(row.startDate),
        endDate: formatDateMMDDYYYY(row.endDate),
        Progress: `${row.timeProgress[0].toFixed(2)}%`,
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
        id: row.employeeId,
        uID: row.uID,
        firstName: row.firstName,
        lastName: row.lastName,
        academicYearEffort: row.academicYearEffort,
        costShareEffort: row.costShareEffort,
        summerEffort: row.summerEffort,
        credit: row.credit,
        isCoPI: row.coPI,
        startDate: formatDateMMDDYYYY(row.startDate),
        endDate: formatDateMMDDYYYY(row.endDate),
        Progress: `${row.timeProgress[0].toFixed(2)}%`,
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

  /*
      academicYearEffort: row.academicYearEffort,
      costShareEffort: row.costShareEffort,
      summerEffort: row.summerEffort,
      credit: row.credit,
      isCoPI: row.isCoPI,
      startDate: formatDateMMDDYYYY(row.startDate),
      endDate: formatDateMMDDYYYY(row.endDate),
  */

  const columns: GridColDef[] = [
    { field: 'uID', headerName: 'UID', flex: .5 },
    { field: 'firstName', headerName: 'First Name', flex: .5 },
    { field: 'lastName', headerName: 'Last Name', flex: .5 },
    { field: 'academicYearEffort', headerName: 'AY Effort', flex: .4 },
    { field: 'summerEffort', headerName: 'S Effort', flex: .4 },
    { field: 'costShareEffort', headerName: 'CS Effort', flex: .4 },
    { field: 'coPI', headerName: 'Is Co-PI', flex: .3 },
    {
      field: 'timeProgress', headerName: 'Contract %', flex: 1,
      renderCell: (params) => (
        <div className="w-full">
          <div className="mb-2 flex items-center justify-between gap-4">
            <Typography variant="small">
              {params.value[1]}
            </Typography>
            <Typography variant="small">
              {params.value[2]}
            </Typography>
          </div>
          <Progress size="sm" color="pink" value={params.value[0]} />
        </div>
      ),
      sortComparator: (v1, v2) => {
        return v1[0] - v2[0];
      },
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      filterModel={filterModel}
      onFilterModelChange={handleFilterModelChange}
      slots={{ toolbar: CustomToolBar }}
    //onRowClick={handleRowClick}
    />
  );

}



export default GrantPIGrid;
