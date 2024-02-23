
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
import { usePaymentGet } from '@/hooks/payment/use-get';
import { usePaymentEditStatus } from '@/hooks/payment/use-edit-status';
import { usePaymentDelete } from '@/hooks/payment/use-delete';
import PaymentEdit from '@/modals/payment/edit';
import PaymentCreate from '@/modals/payment/create';
import { AlertWarning } from '@/utils/notification';



const PaymentTableComponent = ({ openCreate, handleCloseCreate }: any) => {

  const [openEditModal, setOpenEditModal]                 = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal]             = React.useState(false);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = React.useState(false);
  const [loadingData, setLoadingData]                     = React.useState(false);
  const [textSearchTable, setTextSearchTable]             = React.useState('');
  const [startDateSearch, setStartDateSearch]             = React.useState<Dayjs | null>(dayjs().subtract(30,'days'));
  const [endDateSearch, setEndDateSearch]                 = React.useState<Dayjs | null>(dayjs());
  const [isValidSearch, setIsValidSearch]                 = React.useState(true);
  const [editPaymentID, setEditPaymentID]                 = React.useState('');
  const [deletePaymentID, setDeletePaymentID]             = React.useState('');
  const [updatePaymentData, setUpdatePaymentData]         = React.useState<{row: any, event: any}>({row: '', event: ''});
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
  
  const { refetch: doGetPayment, data, isLoading: isLoadingPayment }       = usePaymentGet(queryOptions);
  const { mutate: submitStatusPayment, isLoading: isLoadingStatusPayment } = usePaymentEditStatus({getData: () => getDataPayment()});
  
  
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
  
  const handleOpenEditModal  = (payment_id: string) => {
    setEditPaymentID(payment_id);
    setOpenEditModal(true);
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditPaymentID('');
  }

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal  = (payment_id: string) => {
    setDeletePaymentID(payment_id)
    setOpenDeleteModal(true);
  }
  
  const { mutate: submitDelete, isLoading: isLoadIngDelete } = usePaymentDelete({modalClose: handleCloseDeleteModal,getData: () => getDataPayment()});

  const handleDeletePayment = () => {
    submitDelete({payment_id: deletePaymentID})
  }

  const getDataPayment = () => {
    doGetPayment().then(
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

  const handleUpdateStatusPayment = () => {

    const createObj = {
      batchno     : updatePaymentData.row.batchno,
      discount    : parseFloat(updatePaymentData.row.discount),
      ispercentage: updatePaymentData.row.ispercentage,
      partner_id  : updatePaymentData.row.partner.id,
      docaction   : updatePaymentData.event.target.value,
    }
    submitStatusPayment({payload: createObj, payment_id: updatePaymentData.row.id})
  }

  const handleCloseUpdateStatusModal = () => setOpenUpdateStatusModal(false);
  const handleOpenUpdateStatusModal  = (row: any, event: any) => {
    setUpdatePaymentData({
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

  const [headerData, setHeaderData] = React.useState([
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
    if (isLoadingPayment) {
      setLoadingData(true) 
    } else {
      setLoadingData(false)
    }
  }, [isLoadingPayment]);

  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData,]);


  React.useEffect( () => {
    getDataPayment()
  },[queryOptions])

  
  const checkDateSearch = () => {
    if(startDateSearch?.isAfter(endDateSearch)) {
      setIsValidSearch(false);
      return (AlertWarning('Tanggal awal lebih besar dari tanggal akhir!'))
    }
    else {
      if ((endDateSearch?.diff(startDateSearch, 'day') || 0) > 30){
        setIsValidSearch(false);
        return (AlertWarning('Tanggal tidak boleh lebih dari 30 hari!'))
      }
      else{
        setIsValidSearch(true);
      }
    }
  }
  
  React.useEffect( () => {
    checkDateSearch()
  },[startDateSearch, endDateSearch])


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
                  if(isValidSearch) {
                    handleQuery();
                  }
                  else {
                    AlertWarning('Tanggal tidak valid atau tidak boleh lebih dari 30 hari!')
                  }
                }
              }}
            />
            {/* <Button  variant="contained" color="primary" sx={{ width: '5%'}}> */}
            <IconButton color='secondary' onClick={handleQuery} size="large" disabled={!isValidSearch}>
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
        isLoadingPayment ?
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
            loading        = {isLoadingPayment}
            pageInfo       = {pageData}
            handlePageInfo = {setPageData}
            rowTotal       = {rowTotal}
            handleSortData = {setSortData}
            columnHide     = {{ id: false }}
          />
        }
      </Paper>
      <ModalComponent
        modalOpen    = {openEditModal}
        modalOnClose = {handleCloseEditModal}
        modalSize    = 'xl'
        modalTitle   = 'Edit Payment'
      >
        <PaymentEdit modalOnClose={handleCloseEditModal} payment_id={editPaymentID} getData={getDataPayment}/>
      </ModalComponent>

      <ModalComponent
        modalOpen    = {openCreate}
        modalOnClose = {handleCloseCreate}
        modalSize    = 'xl'
        modalTitle   = 'Create Payment'
      >
        <PaymentCreate modalOnClose={handleCloseCreate} getData={getDataPayment}/>
      </ModalComponent>

      <ModalConfirmComponent
        modalId      = 'payment-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onSubmit     = {handleDeletePayment}
        modalTitle   = {"Delete Confirmation"}
        modalText    = {"Do you want to delete this record?"}
        buttonText   = {"Delete"}
        buttonColor  = {"error"}
      />

      <ModalConfirmComponent
        modalId      = 'payment-update-status'
        modalOpen    = {openUpdateStatusModal}
        modalOnClose = {handleCloseUpdateStatusModal}
        onSubmit     = {handleUpdateStatusPayment}
        modalTitle   = {"Change Status Confirmation"}
        modalText    = {"Do you want to update status this record?"}
        buttonText   = {"Update"}
        buttonColor  = {"primary"}
      />\


    </>
  )
}

export default PaymentTableComponent;