import React from 'react';

import { DataGrid, GridColDef, GridRowsProp, GridSortModel } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@/services/partner/get';


const TableComponent: React.FC<{ 
  // handleQuery    : (data: any)=>void,
    columnData    ?: any,
    rowData       ?: any,
    loading        : boolean,
    pageInfo       : {page: number, pageSize: number},
    handlePageInfo : any,
    rowTotal       : number,
    handleSortData : any,
    columnHide     : any,

    // handleSortModelChange : ()=>void,

  }> = ({columnData, rowData, loading, pageInfo, handlePageInfo, rowTotal, handleSortData, columnHide}) => {
  

  // const [paginationModel, setPaginationModel] = React.useState({
  //   page    : pageInfo.current_page,
  //   pageSize: pageInfo.per_page,
  // });
  // const [custSortModel, setCustSortModel] = React.useState<any[]>([]);

  const [rowCountState, setRowCountState] = React.useState(
    rowTotal || 0,
  );

  // React.useEffect(() => {
  //   console.log("page berubah")
  //   console.log(paginationModel)
  //   handleQuery({ sortModel: [...custSortModel], pagination: paginationModel });
  // }, [paginationModel]);

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowTotal !== undefined ? rowTotal : prevRowCountState,
    );
  }, [rowTotal, setRowCountState]);

  const handleSortModelChange = React.useCallback((sortModel: GridSortModel) => {
    // Here you save the data you need from the sort model
    // console.log(sortModel);
    
    console.log("sort berubah")
    handleSortData(sortModel)
  }, []);

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
        // initialState={{
        //   columns   : columnData,
        //   pagination: { paginationModel: { pageSize: 5 } },
        // }}
        sx                      = {{ overflowX: 'scroll' }}
        columnVisibilityModel   = {columnHide}
        rows                    = {rowData}
        columns                 = {columnData}
        scrollbarSize           = {5}
        disableColumnMenu       = {true}
        sortingMode             = "server"
        onSortModelChange       = {handleSortModelChange}
        loading                 = {loading}
        pageSizeOptions         = {[5,10,15]}
        rowCount                = {rowCountState}
        paginationModel         = {pageInfo}
        paginationMode          = "server"
        onPaginationModelChange = {handlePageInfo}
        
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