
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


const TableComponent: React.FC<{columnData?: any[], rowData?: any[]}> = ({columnData, rowData}) => {
  
  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  return (
    // <div 
    //   style={{ 
    //     width    : '100%',
    //     marginTop: 25
    //   }}
    // >
    <Box width={'100%'}>
      <DataGrid rows={rows} columns={columns} />
      <Fab 
        size       = 'large'
        color      = "primary"
        aria-label = "add"
        sx         = {fabStyle}
      >
        <AddIcon />
      </Fab>
    </Box>

    // </div>
  )
}

export default TableComponent;