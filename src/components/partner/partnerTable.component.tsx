
import React from 'react';
import moment from 'moment'
import styles from '@/styles/Home.module.css'

import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

import TableComponent from '@/components/table.component'
import PartnerCreate from '@/modals/partner/create'
import { usePartnerGet } from '@/hooks/partner/use-get'
import usePartnerDelete from '@/hooks/partner/use-delete'
import PartnerEdit from '@/modals/partner/edit'
import ModalComponent from '@/components/modal.component'
import { Box, IconButton, TextField, Skeleton } from '@mui/material';
import ModalConfirmComponent from '../modalconfirm.component';


const PartnerTableComponent = ({ openCreate, handleCloseCreate }: any) => {

  const [openEditModal, setOpenEditModal]     = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [loadingData, setLoadingData]         = React.useState(false);
  const [textSearchTable, setTextSearchTable] = React.useState('');
  const [editPartnerID, setEditPartnerID]     = React.useState('');
  const [deletePartnerID, setDeletePartnerID] = React.useState('');
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
  
  const { refetch: doGetPartner, data, isLoading: isLoadingPartner } = usePartnerGet(queryOptions);
  const { mutate: submitDelete, isLoading: isLoadIngDelete }         = usePartnerDelete({getData: () => getDataPartner()});
  
  
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
    setEditPartnerID(partner_id);
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditPartnerID('');
  }
  const getDataPartner = () => {
    doGetPartner().then(
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
    setDeletePartnerID(invoice_id)
    setOpenDeleteModal(true);
  }
  const handleDeletePartner = () => {
    submitDelete({partner_id: deletePartnerID})
  }

  const [headerData, setHeaderData]               = React.useState([
    { field: 'id', headerName: 'ID', type : 'string', flex : 0.3, filterble: false },
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterble : false, sortable: false},
    { field: 'name', headerName: 'Name', type: 'string', minWidth:100, flex: 0.75},
    { field: 'bp_code', headerName: 'BP Code', type: 'string', minWidth:100, flex: 0.5},
    { field: 'dn_amount', headerName: 'DN Amount', type: 'number', minWidth:100, flex: 0.25},
    { field: 'cn_amount', headerName: 'CN Amount', type: 'number', minWidth:100, flex: 0.25},
    { field: 'isactive', headerName: 'Is Active', type: 'string', minWidth:100, flex: 0.5},
    { field     : 'created_at',
      headerName: 'Created At',
      type      : 'string',
      minWidth  : 100,
      flex      : 1,
      renderCell: (params:GridRenderCellParams) => moment(params.value).format("DD-MM-YYYY HH:mm:ss"),
    },
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
    if (isLoadingPartner) {
      setLoadingData(true) 
    } else {
      setLoadingData(false)
    }
  }, [isLoadingPartner]);

  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData]);


  React.useEffect( () => {
    getDataPartner()
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
      isLoadingPartner ?
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
          // handleQuery    = {(tableData: any) => handleQuery(tableData)}
          loading        = {isLoadingPartner}
          pageInfo       = {pageData}
          handlePageInfo = {setPageData}
          rowTotal       = {rowTotal}
          handleSortData = {setSortData}
          columnHide     = {{ id: false }}
        />
      }
      <ModalComponent
        isTemporary = {false}
        modalOpen    = {openEditModal}
        modalOnClose = {handleCloseEditModal}
        modalSize    = 'sm'
        modalTitle   = 'Edit Partner'
      >
        <PartnerEdit modalOnClose={handleCloseEditModal} partner_id={editPartnerID} getData={getDataPartner}/>
      </ModalComponent>

      <ModalComponent
        modalOpen    = {openCreate}
        modalOnClose = {handleCloseCreate}
        modalSize    = 'sm'
        modalTitle   = 'Create Partner'
      >
        <PartnerCreate modalOnClose={handleCloseCreate} getData={getDataPartner}/>
      </ModalComponent>

      <ModalConfirmComponent
        modalId      = 'partner-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onDelete     = {handleDeletePartner} 
      />
    </>
  )
}

export default PartnerTableComponent;