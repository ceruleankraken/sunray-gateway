
import React from 'react';

import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

import TableComponent from '@/components/table.component'
import ModalComponent from '@/components/modal.component'
import { useProductGet } from '@/hooks/product/use-get';
import useProductDelete from '@/hooks/product/use-delete';
import ProductEdit from '@/modals/product/edit';
import ProductCreate from '@/modals/product/create';
import { Box, IconButton, TextField, Skeleton } from '@mui/material';
import ModalConfirmComponent from '../modalconfirm.component';


const ProductTableComponent = ({ openCreate, handleCloseCreate }: any) => {

  const [openEditModal, setOpenEditModal]     = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [loadingData, setLoadingData]         = React.useState(false);
  const [editProductID, setEditProductID]     = React.useState('');
  const [deleteProductID, setDeleteProductID] = React.useState('');
  const [textSearchTable, setTextSearchTable] = React.useState('');
  const [rowData, setRowData]                 = React.useState<any[]>([]);
  const [sortData, setSortData]               = React.useState<{field: string, sort:string }[]>([]);
  const [rowTotal, setRowTotal]               = React.useState(0);
  const [pageData, setPageData]               = React.useState({
    page    : 0,
    pageSize: 5,
  });
  const [queryOptions, setQueryOptions]   = React.useState({
    field : 'id',
    sort  : 'asc',
    limit : '5',
    offset: '',
    q     : '',
  });
  
  const { refetch: doGetProduct, data, isLoading: isLoadingProduct } = useProductGet(queryOptions);
  
  
  const handleQuery = () => {
    setQueryOptions({
      field : sortData[0]?.field,
      sort  : sortData[0]?.sort,
      limit : pageData.pageSize.toString(),
      offset: ((pageData.page)*pageData.pageSize).toString(),
      q     : textSearchTable,
    })
  }
  const handleOpenEditModal = (partner_id: string) => {
    setOpenEditModal(true);
    setEditProductID(partner_id);
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditProductID('');
  }
  const getDataProduct = () => {
    doGetProduct().then(
      (resp: any) => {
        if(resp.status == 'error') {
        }
        else {
          const startNo = (resp.data.meta.per_page * (resp.data.meta.current_page-1))
          const rows    = resp.data.data.map( (val: any,idx: number) => ({no: startNo+idx+1, ...val}) )
          setRowData(rows);
          setRowTotal(resp.data.meta.total_data)
        }        
      } 
    )
  }

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal  = (invoice_id: string) => {
    setDeleteProductID(invoice_id)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDelete, isLoading: isLoadIngDelete }         = useProductDelete({modalClose: handleCloseDeleteModal,getData: () => getDataProduct()});
  
  const handleDeletePartner = () => {
    submitDelete({product_id: deleteProductID})
  }
  
  
  const [headerData, setHeaderData] = React.useState([
    { field: 'id', headerName: 'ID', type : 'string', flex : 0.3, filterble: false },
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterble : false, sortable: false},
    { field: 'value', headerName: 'Value', type: 'string', minWidth:100, flex: 0.75},
    { field: 'name', headerName: 'Name', type: 'string', minWidth:100, flex: 0.5},
    { field: 'description', headerName: 'Description', type: 'number', minWidth:100, flex: 0.25},
    { field: 'upc', headerName: 'UPC', type: 'number', minWidth:100, flex: 0.25},
    { field: 'action', type: 'actions', width:100, getActions: (params: GridRenderCellParams) => [
      // eslint-disable-next-line react/jsx-key
      <GridActionsCellItem
        key     = {"edit-"+params.id}
        icon    = {<EditIcon />}
        label   = "Edit"
        onClick = {() => handleOpenEditModal(params.row.id)}
        showInMenu
      />,
      <GridActionsCellItem
        key     = {"delete-"+params.id}
        icon    = {<DeleteIcon />}
        label   = "Delete"
        onClick = {() => {handleOpenDeleteModal(params.row.id)}}
        showInMenu
      />,
    ]},
  ]);

  
  React.useEffect(() => {
    if (isLoadingProduct) {
      setLoadingData(true) 
    } else {
      setLoadingData(false)
    }
  }, [isLoadingProduct]);

  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData]);


  React.useEffect( () => {
    getDataProduct()
  },[queryOptions])

  return (
    <>
      <Box sx={{ mb:2, display: 'flex', alignItems: 'stretch', justifyContent: 'center', alignContent: 'center', }}>
        <TextField
          fullWidth
          color    = 'secondary'
          id       = "inputSearchTable"
          size     = "small"
          name     = "inputSearchTable"
          value    = {textSearchTable}
          label    = "Search"
          variant  = "outlined"
          onChange = { (e) => {
            setTextSearchTable(e.target.value)
          }}
          onKeyUp     = {(event:any) => {
            if (event.key === 'Enter' || event.target.value == '') {
              handleQuery();
            }
          }}
        />
        {/* <Button  variant="contained" color="primary" sx={{ width: '5%'}}> */}
        <IconButton color='secondary' onClick={handleQuery} size="large">
          <SearchIcon />
        </IconButton>
        {/* </Button> */}
      </Box>
      {
      isLoadingProduct ?
        <Skeleton >
          <div 
            style = {{
              width  : '100%',
              height : 400,
            }}
          > 
          </div>
        </Skeleton>
      :
        <TableComponent
          rowData        = {rowData}
          columnData     = {headerData}
          loading        = {isLoadingProduct}
          pageInfo       = {pageData}
          handlePageInfo = {setPageData}
          rowTotal       = {rowTotal}
          handleSortData = {setSortData}
          columnHide     = {{ id: false }}
        />
      }
      <ModalComponent
        modalOpen    = {openEditModal}
        modalOnClose = {handleCloseEditModal}
        modalSize    = 'sm'
        modalTitle   = 'Edit Product'
      >
        <ProductEdit modalOnClose={handleCloseEditModal} product_id={editProductID} getData={getDataProduct}/>
      </ModalComponent>

      <ModalComponent
        modalOpen    = {openCreate}
        modalOnClose = {handleCloseCreate}
        modalSize    = 'sm'
        modalTitle   = 'Create Product'
      >
        <ProductCreate modalOnClose={handleCloseCreate} getData={getDataProduct}/>
      </ModalComponent>
      
      <ModalConfirmComponent
        modalId      = 'product-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onDelete     = {handleDeletePartner} 
      />
    </>
  )
}

export default ProductTableComponent;