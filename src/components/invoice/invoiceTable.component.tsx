
import React from 'react';
import moment from 'moment'
import styles from '@/styles/Home.module.css'

import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Box, IconButton, TextField, Skeleton, Paper, Accordion, AccordionSummary, AccordionDetails, Stack, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';

import TableComponent from '@/components/table.component'
import ModalComponent from '@/components/modal.component'
import { useInvoiceGet } from '@/hooks/invoice/use-get';
import { useInvoiceDelete } from '@/hooks/invoice/use-delete';
import InvoiceCreate from '@/modals/invoice/create';
import InvoiceEdit from '@/modals/invoice/edit';
import ModalConfirmComponent from '../modalconfirm.component';
import dayjs, { Dayjs } from 'dayjs';
import InvoiceUpdatestatus from '@/modals/invoice/update_status';
import { useInvoiceEdit } from '@/hooks/invoice/use-edit';
import { useInvoiceEditStatus } from '@/hooks/invoice/use-edit-status';



const InvoiceTableComponent = ({ openCreate, handleCloseCreate }: any) => {

  const [openEditModal, setOpenEditModal]                 = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal]             = React.useState(false);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = React.useState(false);
  const [loadingData, setLoadingData]                     = React.useState(false);
  const [textSearchTable, setTextSearchTable]             = React.useState('');
  const [startDateSearch, setStartDateSearch]             = React.useState<Dayjs | null>(dayjs());
  const [endDateSearch, setEndDateSearch]                 = React.useState<Dayjs | null>(dayjs().add(1,'month'));
  const [editInvoiceID, setEditInvoiceID]                 = React.useState('');
  const [deleteInvoiceID, setDeleteInvoiceID]             = React.useState('');
  const [updateInvoiceData, setUpdateInvoiceData]         = React.useState<{row: any, event: any}>({row: '', event: ''});
  const [rowData, setRowData]                             = React.useState<any[]>([]);
  const [sortData, setSortData]                           = React.useState<{field: string, sort:string }[]>([]);
  const [rowTotal, setRowTotal]                           = React.useState(0);
  const [pageData, setPageData]                           = React.useState({
    page    : 0,
    pageSize: 5,
  });
  const [queryOptions, setQueryOptions]   = React.useState({
    field    : 'id',
    sort     : 'asc',
    limit    : '5',
    offset   : '',
    q        : '',
    date_from: startDateSearch?.format("YYYY-MM-DD"),
    date_to  : endDateSearch?.format("YYYY-MM-DD"),
  });
  
  const { refetch: doGetInvoice, data, isLoading: isLoadingInvoice }       = useInvoiceGet(queryOptions);
  const { mutate: submitStatusInvoice, isLoading: isLoadingStatusInvoice } = useInvoiceEditStatus({getData: () => getDataInvoice()});
  
  
  const handleQuery  = () => {
    setQueryOptions({
      field    : sortData[0]?.field,
      sort     : sortData[0]?.sort,
      limit    : pageData.pageSize.toString(),
      offset   : ((pageData.page)*pageData.pageSize).toString(),
      q        : textSearchTable,
      date_from: startDateSearch?.format("YYYY-MM-DD"),
      date_to  : endDateSearch?.format("YYYY-MM-DD"),
    })
  }
  // const handleOpenStatusModal  = (invoice_id: string) => {
  //   setOpenStatusModal(true);
  //   setEditStatusInvoiceID(invoice_id)
  // }
  // const handleCloseStatusModal = () => {
  //   setOpenStatusModal(false);
  //   setEditStatusInvoiceID('')
  // }

  
  const handleOpenEditModal  = (invoice_id: string) => {
    setEditInvoiceID(invoice_id);
    setOpenEditModal(true);
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditInvoiceID('');
  }

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal  = (invoice_id: string) => {
    setDeleteInvoiceID(invoice_id)
    setOpenDeleteModal(true);
  }
  
  const { mutate: submitDelete, isLoading: isLoadIngDelete }         = useInvoiceDelete({modalClose: handleCloseDeleteModal,getData: () => getDataInvoice()});

  const handleDeleteInvoice = () => {
    submitDelete({invoice_id: deleteInvoiceID})
  }

  const getDataInvoice = () => {
    doGetInvoice().then(
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

  const handleUpdateStatusInvoice = () => {

    const createObj = {
      batchno     : updateInvoiceData.row.batchno,
      discount    : parseFloat(updateInvoiceData.row.discount),
      ispercentage: updateInvoiceData.row.ispercentage,
      partner_id  : updateInvoiceData.row.partner.id,
      docaction   : updateInvoiceData.event.target.value,
    }
    submitStatusInvoice({payload: createObj, invoice_id: updateInvoiceData.row.id})
  }

  const handleCloseUpdateStatusModal = () => setOpenUpdateStatusModal(false);
  const handleOpenUpdateStatusModal  = (row: any, event: any) => {
    setUpdateInvoiceData({
      row  : row,
      event: event,
    })
    
    setOpenUpdateStatusModal(true);
  }

  const statusOptions = [
    { value: "DR", label: "Draft" },
    { value: "IP", label: "In Progress" },
    { value: "CO", label: "Complete" },
    { value: "VO", label: "Void" },
  ];

  const [headerData, setHeaderData]               = React.useState([
    { field: 'id', headerName: 'ID', type : 'string', flex : 0.3, filterble: false },
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterble : false, sortable: false},
    { field: 'documentno', headerName: 'No Document', type: 'string', minWidth:175, flex: 0.75},
    { field: 'batchno', headerName: 'No Batch', type: 'string', minWidth:175, flex: 0.5},
    { field: 'partner', headerName: 'Partner', type: 'string', minWidth:175, flex: 0.25,
      valueGetter: (params: GridRenderCellParams) => params.row.partner.name 
    },
    { field: 'status', headerName: 'Status', type: 'string', minWidth:175, flex: 0.5,
      renderCell: (params: any) => {
        return (
          <TextField
            select
            fullWidth
            size     = 'small'
            id       = "outlined-select-currency"
            value    = {params.row.status}
            // disabled = {params.row.status == 'CO'}
            onChange = {(event) => handleOpenUpdateStatusModal(params.row, event)}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )
      }
    },
    { field: 'action', type: 'actions', width:100, getActions: (params: GridRenderCellParams) => [
      
      // <GridActionsCellItem
      //   key     = {"delete-"+params.id}
      //   icon    = {<AssignmentIcon />}
      //   label   = "Change Status"
      //   onClick = {() => handleOpenStatusModal(params.row.id)}
      //   showInMenu
      // />,
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
    if (isLoadingInvoice) {
      setLoadingData(true) 
    } else {
      setLoadingData(false)
    }
  }, [isLoadingInvoice]);

  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData, startDateSearch, endDateSearch]);


  React.useEffect( () => {
    getDataInvoice()
  },[queryOptions])

  return (
    <>
      <Accordion
        defaultExpanded
        sx={{
          borderRadius: 1,
          marginTop   : 1,
        }}  
      >
        <AccordionSummary
          expandIcon    = {<ExpandMoreIcon />}
          aria-controls = "panel1-content"
          id            = "panel1-header"
        >
          Filter
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={"row"} gap={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                <DatePicker
                  label     = {"Start Date"}
                  value     = {dayjs(startDateSearch)}
                  format    = 'DD-MM-YYYY'
                  onChange  = {(newValue) => setStartDateSearch(newValue)}
                  // sx        = {{mb:2}}
                  slotProps = {{ textField: { size: 'small' } }}
                />
                <DatePicker
                  label     = {"End Date"}
                  value     = {dayjs(endDateSearch)}
                  format    = 'DD-MM-YYYY'
                  onChange  = {(newValue) => setEndDateSearch(newValue)}
                  // sx        = {{mb:2}}
                  slotProps = {{ textField: { size: 'small' } }}
                />
            </LocalizationProvider>

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
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Paper 
        sx={{
          p            : 2,
          mt           : 1,
          display      : 'flex',
          flexDirection: 'column',
          // height       : 240,
        }}
      >
        {
        isLoadingInvoice ?
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
            loading        = {isLoadingInvoice}
            pageInfo       = {pageData}
            handlePageInfo = {setPageData}
            rowTotal       = {rowTotal}
            handleSortData = {setSortData}
            columnHide     = {{ id: false }}
          />
        }
      </Paper>
{/*       
      <ModalComponent
        modalOpen    = {openStatusModal}
        modalOnClose = {handleCloseStatusModal}
        modalSize    = 'xs'
        modalTitle   = 'Change Status'
      >
        <InvoiceUpdatestatus modalOnClose={handleCloseStatusModal} invoice_id={editStatusInvoiceID} getData={getDataInvoice}/>
      </ModalComponent> */}

      <ModalComponent
        modalOpen    = {openEditModal}
        modalOnClose = {handleCloseEditModal}
        modalSize    = 'xl'
        modalTitle   = 'Edit Invoice'
      >
        <InvoiceEdit modalOnClose={handleCloseEditModal} invoice_id={editInvoiceID} getData={getDataInvoice}/>
        {/* <PartnerEdit modalOnClose={handleCloseEditModal} partner_id={editPartnerID} getData={getDataPartner}/> */}
      </ModalComponent>

      <ModalComponent
        modalOpen    = {openCreate}
        modalOnClose = {handleCloseCreate}
        modalSize    = 'xl'
        modalTitle   = 'Create Invoice'
      >
        <InvoiceCreate modalOnClose={handleCloseCreate} getData={getDataInvoice}/>
      </ModalComponent>

      <ModalConfirmComponent
        modalId      = 'invoice-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onSubmit     = {handleDeleteInvoice}
        modalTitle   = {"Delete Confirmation"}
        modalText    = {"Do you want to delete this record?"}
        buttonText   = {"Delete"}
        buttonColor  = {"error"}
      />

      <ModalConfirmComponent
        modalId      = 'invoice-update-status'
        modalOpen    = {openUpdateStatusModal}
        modalOnClose = {handleCloseUpdateStatusModal}
        onSubmit     = {handleUpdateStatusInvoice}
        modalTitle   = {"Change Status Confirmation"}
        modalText    = {"Do you want to update status this record?"}
        buttonText   = {"Update"}
        buttonColor  = {"primary"}
      />\


    </>
  )
}

export default InvoiceTableComponent;