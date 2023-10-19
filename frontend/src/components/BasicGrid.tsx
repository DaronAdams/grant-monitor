import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const BasicGrid = () => {
    
  const rows: GridRowsProp = [
    {'id': 1, 'col1': 'Item 1', 'col2': 'Owner 1', 'col3': 'Month 1', 'col4': 34.3, 'col5': 647214, 'col6': 87192, 'col7': 'Not Received', 'col8': 'Owner 1'},
    {'id': 2, 'col1': 'Item 2', 'col2': 'Owner 2', 'col3': 'Month 2', 'col4': 21.6, 'col5': 838009, 'col6': 471133, 'col7': 'Received', 'col8': 'Owner 2'},
    {'id': 3, 'col1': 'Item 3', 'col2': 'Owner 3', 'col3': 'Month 3', 'col4': 90.2, 'col5': 47279, 'col6': 525439, 'col7': 'Received', 'col8': 'Owner 3'},
    {'id': 4, 'col1': 'Item 4', 'col2': 'Owner 4', 'col3': 'Month 4', 'col4': 29.8, 'col5': 518887, 'col6': 101891, 'col7': 'Not Received', 'col8': 'Owner 4'},
    {'id': 5, 'col1': 'Item 5', 'col2': 'Owner 5', 'col3': 'Month 5', 'col4': 4.7, 'col5': 613824, 'col6': 211361, 'col7': 'Received', 'col8': 'Owner 5'},
    {'id': 6, 'col1': 'Item 6', 'col2': 'Owner 6', 'col3': 'Month 6', 'col4': 85.2, 'col5': 4362, 'col6': 185927, 'col7': 'Received', 'col8': 'Owner 6'},
    {'id': 7, 'col1': 'Item 7', 'col2': 'Owner 7', 'col3': 'Month 7', 'col4': 4.8, 'col5': 555071, 'col6': 131094, 'col7': 'Received', 'col8': 'Owner 7'},
    {'id': 8, 'col1': 'Item 8', 'col2': 'Owner 8', 'col3': 'Month 8', 'col4': 52.6, 'col5': 110142, 'col6': 53793, 'col7': 'Received', 'col8': 'Owner 8'},
    {'id': 9, 'col1': 'Item 9', 'col2': 'Owner 9', 'col3': 'Month 9', 'col4': 94.6, 'col5': 564278, 'col6': 724185, 'col7': 'Received', 'col8': 'Owner 9'},
    {'id': 10, 'col1': 'Item 10', 'col2': 'Owner 10', 'col3': 'Month 10', 'col4': 62.6, 'col5': 23518, 'col6': 587459, 'col7': 'Received', 'col8': 'Owner 10'},
    {'id': 11, 'col1': 'Item 11', 'col2': 'Owner 11', 'col3': 'Month 11', 'col4': 21.8, 'col5': 626118, 'col6': 564111, 'col7': 'Received', 'col8': 'Owner 11'},
    {'id': 12, 'col1': 'Item 12', 'col2': 'Owner 12', 'col3': 'Month 12', 'col4': 14.5, 'col5': 210369, 'col6': 395765, 'col7': 'Received', 'col8': 'Owner 12'},
    {'id': 13, 'col1': 'Item 13', 'col2': 'Owner 13', 'col3': 'Month 13', 'col4': 76.1, 'col5': 171272, 'col6': 706538, 'col7': 'Not Received', 'col8': 'Owner 13'},
    {'id': 14, 'col1': 'Item 14', 'col2': 'Owner 14', 'col3': 'Month 14', 'col4': 73.0, 'col5': 700050, 'col6': 898385, 'col7': 'Received', 'col8': 'Owner 14'},
    {'id': 15, 'col1': 'Item 15', 'col2': 'Owner 15', 'col3': 'Month 15', 'col4': 11.2, 'col5': 710782, 'col6': 994441, 'col7': 'Not Received', 'col8': 'Owner 15'},
    {'id': 16, 'col1': 'Item 16', 'col2': 'Owner 16', 'col3': 'Month 16', 'col4': 76.8, 'col5': 547110, 'col6': 360127, 'col7': 'Not Received', 'col8': 'Owner 16'},
    {'id': 17, 'col1': 'Item 17', 'col2': 'Owner 17', 'col3': 'Month 17', 'col4': 12.5, 'col5': 264652, 'col6': 534190, 'col7': 'Not Received', 'col8': 'Owner 17'},
    {'id': 18, 'col1': 'Item 18', 'col2': 'Owner 18', 'col3': 'Month 18', 'col4': 59.4, 'col5': 683744, 'col6': 694578, 'col7': 'Not Received', 'col8': 'Owner 18'},
    {'id': 19, 'col1': 'Item 19', 'col2': 'Owner 19', 'col3': 'Month 19', 'col4': 74.0, 'col5': 437052, 'col6': 720585, 'col7': 'Received', 'col8': 'Owner 19'},
    {'id': 20, 'col1': 'Item 20', 'col2': 'Owner 20', 'col3': 'Month 20', 'col4': 10.6, 'col5': 37305, 'col6': 242306, 'col7': 'Received', 'col8': 'Owner 20'},
    {'id': 21, 'col1': 'Item 21', 'col2': 'Owner 21', 'col3': 'Month 21', 'col4': 45.1, 'col5': 427363, 'col6': 258594, 'col7': 'Received', 'col8': 'Owner 21'},
    {'id': 22, 'col1': 'Item 22', 'col2': 'Owner 22', 'col3': 'Month 22', 'col4': 38.6, 'col5': 282923, 'col6': 12181, 'col7': 'Not Received', 'col8': 'Owner 22'},
    {'id': 23, 'col1': 'Item 23', 'col2': 'Owner 23', 'col3': 'Month 23', 'col4': 68.2, 'col5': 388311, 'col6': 935180, 'col7': 'Not Received', 'col8': 'Owner 23'},
    {'id': 24, 'col1': 'Item 24', 'col2': 'Owner 24', 'col3': 'Month 24', 'col4': 64.3, 'col5': 569914, 'col6': 282012, 'col7': 'Not Received', 'col8': 'Owner 24'},
    {'id': 25, 'col1': 'Item 25', 'col2': 'Owner 25', 'col3': 'Month 25', 'col4': 76.5, 'col5': 781879, 'col6': 417749, 'col7': 'Received', 'col8': 'Owner 25'},
  ];
    
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Items', width: 120 },
    { field: 'col2', headerName: 'PI', width: 100 },
    { field: 'col3', headerName: 'Timeline', width: 120 },
    { field: 'col4', headerName: 'Funds Spent', width: 100 },
    { field: 'col5', headerName: 'Amount Recieved', width: 150 },
    { field: 'col6', headerName: 'Spent', width: 120 },
    { field: 'col7', headerName: 'Status', width: 120 },
    { field: 'col8', headerName: 'Owner', width: 100 },
  ];


  return ( 
    <>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
}
 
export default BasicGrid;