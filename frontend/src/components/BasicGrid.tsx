import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const BasicGrid = () => {
    
    const rows: GridRowsProp = [
    { id: 1, col1: 'Scaffolding', col2: 'Rus', col3: 'Aug - Sept', col4: '95.3',
        col5: 499136, col6: 465780, col7: 'Received', col8: 'Owner'}
    ];
    
    const columns: GridColDef[] = [
        { field: 'item', headerName: 'Items', width: 150 },
        { field: 'pi', headerName: 'PI', width: 50 },
        { field: 'timeline', headerName: 'Timeline', width: 150 },
        { field: 'fundsspent', headerName: 'Funds Spent', width: 50 },
        { field: 'amountrecieved', headerName: 'Amount Recieved', width: 150 },
        { field: 'spent', headerName: 'Spent', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'owner', headerName: 'Owner', width: 75 },
    ];


    return ( 
        <>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </>
     );
}
 
export default BasicGrid;