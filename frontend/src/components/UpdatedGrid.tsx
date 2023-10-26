import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridColDef, GridRowsProp,} from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';

const UpdatedGrid = () => {


const rows: GridRowsProp = [
    {
        grant: 'Grant 1',
        owner: 'Amy Cook',
        startDate: new Date(2021,8,4),
        endDate: new Date(2022,8,4),
        moneyAllocated: 150000,
        moneySpent: 150000,
        grantStatus: 'Grant Finished',
        id:0,
    },

    {
        grant: 'Grant 2',
        owner: 'Amy Cook',
        startDate: new Date(2023,8,4),
        endDate: new Date(2025,5,4),
        moneyAllocated: 250000,
        moneySpent: 80000,
        grantStatus: 'In Progress',
        id:1,
    },

    {
        grant: 'Grant 3',
        owner: 'Amy Cook',
        startDate: new Date(2023,11,1),
        endDate: new Date(2024,8,4),
        moneyAllocated: 300000,
        moneySpent: 0,
        grantStatus: 'Grant Not Started',
        id:2,
    },

    {
        grant: 'Grant 4',
        owner: 'Vinhthuy Phan',
        startDate: new Date(2022,11,1),
        endDate: new Date(2023,3,4),
        moneyAllocated: 300000,
        moneySpent: 300000,
        grantStatus: 'Grant Finished',
        id:3,
    },

    {
        grant: 'Grant 5',
        owner: 'Vinhthuy Phan',
        startDate: new Date(2023,5,4),
        endDate: new Date(2026,3,4),
        moneyAllocated: 500000,
        moneySpent: 100000,
        grantStatus: 'In Progress',
        id:4,
    },

    {
        grant: 'Grant 6',
        owner: 'Fatih Sen',
        startDate: new Date(2023,12,2),
        endDate: new Date(2025,2,4),
        moneyAllocated: 400000,
        moneySpent: 0,
        grantStatus: 'Grant Not Started',
        id:5,
    },
        
];

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


const columns: GridColDef[] = [


    {field: 'grant', headerName: 'Grant', width: 200},
    {field: 'owner', headerName: 'PI', width: 200},
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

function CustomToolBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

const exportDataAsCSV = (data: Array<{ [key: string]: any }>) => {
        const formattedData = data.map((row) => ({
          Grant: row.grant,
          PI: row.owner,
          StartDate: row.startDate.toLocaleDateString('en-GB'), // Format date as dd/mm/yyyy
          EndDate: row.endDate.toLocaleDateString('en-GB'), // Format date as dd/mm/yyyy
          Progress: `${row.progress.toFixed(2)}%`,
          MoneyAllocated: `$${row.moneyAllocated}`,
          MoneySpent: `$${row.moneySpent}`,
          MoneyLeft: `$${row.moneyLeft}`,
          GrantStatus: row.grantStatus,
        }));
      
        const csvContent =
          "data:text/csv;charset=utf-8," +
          [Object.keys(formattedData[0]), ...formattedData.map(Object.values)]
            .map((row) => row.join(','))
            .join('\n');
      
        const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportCSV = () => {
    exportDataAsCSV(rows as Array<{ [key: string]: any }>);
    handleMenuClose();
  };
  
    const rowsForExcelExport = rows.map((row) => ({
        Grant: row.grant,
        PI: row.owner,
        StartDate: row.startDate,
        EndDate: row.endDate,
        Progress: row.progress,
        MoneyAllocated: row.moneyAllocated,
        MoneySpent: row.moneySpent,
        MoneyLeft: row.moneyLeft,
        GrantStatus: row.grantStatus,
      }));
    
    const handleExcelExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(rowsForExcelExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'DataGrid');
    
        // Save the Excel file
        XLSX.writeFile(workbook, 'data.xlsx');
    };

    return (
        <GridToolbarContainer>
          <IconButton onClick={handleMenuOpen}>
            <SaveAltIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleExportCSV}>Download as CSV</MenuItem>
            <MenuItem onClick={handleExcelExport}>Download as Excel</MenuItem>
           
          </Menu>
        </GridToolbarContainer>
      );

}



/*
function CustomToolBar(){
    return (
        <GridToolbarContainer>
            
            <GridToolbarExport
            excelOptions = {{

                customColumnHeaders: columns.map((column) => ({
                    id: column.field,
                    displayName: column.headerName,
                    numFmt: column.field === 'progress' ? '0.00%' : undefined,
                  })),
                startDate: { numFmt : 'dd/mm/yyyy'},
                endDate: { numFmt : 'dd/mm/yyyy'},
                

            }}/>

        </GridToolbarContainer>
    );
}
*/




return(

        <div style = {{height: 300, width:'100%'}}>
            <DataGrid
            rows = {rows}
            columns = {columns}
            slots = {{toolbar: CustomToolBar}}/>
        </div>
    
    );

}

export default UpdatedGrid;