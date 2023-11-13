import React from 'react';

import { DataGrid, GridColDef, GridRowsProp, GridSortModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


const TableComponent: React.FC<{ 
    columnData ?: any,
    rowData    ?: any
    handleQuery : (data: any)=>void,
    loading     : boolean
    // handleSortModelChange : ()=>void,

  }> = ({columnData, rowData, handleQuery, loading}) => {
  
    
  const handleSortModelChange = React.useCallback((sortModel: GridSortModel) => {
    // Here you save the data you need from the sort model
    console.log(sortModel);
    handleQuery({ sortModel: [...sortModel] });
  }, []);

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
    // <Box sx={{minWidth:0}}>
    <div style={{
      width     : '100%',
      minWidth  : 0,
      display   : 'grid',
      // transition: 'width 0.2s ease-out',
    }}>
      <DataGrid 
        sx                = {{ overflowX: 'scroll' }}
        rows              = {rowData}
        columns           = {columnData}
        scrollbarSize     = {5}
        disableColumnMenu = {true}
        sortingMode       = "server"
        onSortModelChange = {handleSortModelChange}
        loading           = {loading}
      />
      {/* <Fab 
        size       = 'large'
        color      = "primary"
        aria-label = "add"
        sx         = {fabStyle}
      >
        <AddIcon />
      </Fab> */}
    {/* </Box> */}
    </div>
  )
}

export default TableComponent;