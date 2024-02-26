import React from 'react'
import { TextField, Button, Stack, Switch, FormControlLabel, MenuItem, Box, Autocomplete} from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import 'dayjs/locale/en-gb';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalConfirmComponent from '@/components/modalconfirm.component';
import ModalComponent from '@/components/modal.component';
import { usePartnerGetActive } from '@/hooks/partner/use-get-active';
import { usePaymentLineDelete } from '@/hooks/payment/use-delete-line';
import { usePaymentEdit } from '@/hooks/payment/use-edit';
import { usePaymentGetOne } from '@/hooks/payment/use-get-one';
import PaymentEditLine from './edit_line';

export default function PaymentEdit({modalOnClose, payment_id, getData}:any) {

  const [partnerOptions, setPartnerOptions]           = React.useState([])
  const [linePayment, setLinePayment]                 = React.useState<any[]>([])
  const [grandTotal, setGrandTotal]                   = React.useState(0);
  const [lineTotal, setLineTotal]                     = React.useState(0);
  const [deletePaymentLineID, setDeletePaymentLineID] = React.useState('');
  const [editPaymentLineID, setEditPaymentLineID]     = React.useState('');
  const [openDeleteModal, setOpenDeleteModal]         = React.useState(false);
  const [openEditModal, setOpenEditModal]             = React.useState(false);

  const { refetch: doGetPartner, data: dataPartner, isLoading: isLoadingPartner } = usePartnerGetActive();
  
  const { 
    watch,
    control,
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    batchno     : string,
    partner_id  : {} | null,
  }>({
    defaultValues: {
      batchno     : '',
      partner_id  : null,
    }
  })

  const loadData = (data: any) => {
    // console.log(data);
    reset({
      batchno     : data.data.batchno,
      partner_id  : data.data.partner ? {value: data.data.partner.id, label: data.data.partner.name} : null,
    })
    
    // console.log(data.data.line)
    const rows    = data.data.line.map( (val: any,idx: number) => ({line_id: idx, ...val}) )
    // data.data.line.map((val) => ({

    // }))
    setGrandTotal(data.data.grand_total)
    setLineTotal(data.data.total_line)
    setLinePayment(rows);
  }
  
  
  
  // const deleteLineInvoice = () => {
  //   setLineInvoice( (prevList) => prevList.filter( (row:any) => row.line_id !== deleteInvoiceLineID))
  // };


  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal  = (payment_line_id: string) => {
    setDeletePaymentLineID(payment_line_id)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDeleteLine, isLoading: isLoadIngDeleteLine } = usePaymentLineDelete({ modalClose: handleCloseDeleteModal ,updateTable: () => doGetPayment() });
  
  const handleDeletePaymentLine = () => {
    submitDeleteLine({payment_line_id: deletePaymentLineID})
  }


  const handleOpenEditModal  = (payment_id: string) => {
    setEditPaymentLineID(payment_id);
    setOpenEditModal(true);
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditPaymentLineID('');
  }


  const { mutate: submitEditPayment, isLoading }                        = usePaymentEdit({closeModal: ()=>modalOnClose(), payment_id: payment_id, getData: () => getData()});
  const { refetch: doGetPayment, data, isLoading: isLoadingGetPartner } = usePaymentGetOne(payment_id, (dataOriginal: any)=>loadData(dataOriginal));

  const [lineColumn, setLineColumn]  = React.useState([
      { field: 'id', headerName: 'ID', type : 'string', flex : 0.3, filterble: false },
      { field: 'no', headerName: 'No', type: 'number', width: 10, filterble : false, sortable: false,
        renderCell: (params: any) => params.api.getAllRowIds().indexOf(params.id)+1
      },
      { field: 'payment', headerName: 'Payment ID', type : 'string', minWidth: 250, filterble: false,
        valueGetter: (params: GridRenderCellParams) => params.row.payment.id 
      },
      { field: 'documentno', headerName: 'No Document', type : 'string', minWidth: 200, filterble: false,
        valueGetter: (params: GridRenderCellParams) => params.row.invoice.documentno 
      },
      { field: 'batchno', headerName: 'No Batch', type : 'string', minWidth: 150, filterble: false,
        valueGetter: (params: GridRenderCellParams) => params.row.invoice.batchno 
      },
      { field: 'price', headerName: 'Price', type : 'string', minWidth: 100, filterble: false },
      { field: 'amount', headerName: 'Amount', type : 'string', minWidth: 100, filterble: false },
      { field: 'total', headerName: 'Total', type : 'string', minWidth: 150, filterble: false },
      { field: 'action', type: 'actions', width:50, getActions: (params: any) => [
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
          onClick = {() => handleOpenDeleteModal(params.row.id)}
          showInMenu
        />,
      ]},
    ],
  );

  const getDataPartner = () => {
    doGetPartner().then(
      (resp: any) => {
        if(resp.status == 'error') {
        }
        else {
          const rows    = resp.data.data.map( (val: any,idx: number) => ({value: val.id, label: (val.name).toUpperCase()}) )
          setPartnerOptions(rows);
        }
      } 
    )
  }
  

  
  const countGrandTotal = () => {
    // const result = lineInvoice.reduce( (total, line:any) => total + line.total)
    let total = 0;
    linePayment.forEach((value: any) => {
      // console.log(value.total);
      total = total + value.amount
    })
    
    setGrandTotal(total)
  }

  const onSubmit: SubmitHandler<{}> = (data: any) => {

    const createObj = {
      batchno     : data.batchno,
      partner_id  : data.partner_id.value,
    }
    submitEditPayment(createObj)
  }

  React.useEffect( () => {
    countGrandTotal();
  }, [linePayment])

  React.useEffect(() => {
    getDataPartner();
    doGetPayment();
  },[])

  
  const FooterGrandTotal = () => {

    // console.log(grandTotal)
    const grandTotalRupiah = new Intl.NumberFormat('id-ID', {
      style   : 'currency',
      currency: 'IDR',
    }).format(grandTotal);

    const lineTotalRupiah = new Intl.NumberFormat('id-ID', {
      style   : 'currency',
      currency: 'IDR',
    }).format(lineTotal);

    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        <table>
          <tr>
            <td>
              Line Total
            </td>
            <td>
              :
            </td>
            <td>
              {lineTotalRupiah}
            </td>
          </tr>
          <tr>
            <td>
              Grand Total
            </td>
            <td>
              :
            </td>
            <td>
              {grandTotalRupiah}
            </td>
          </tr>
        </table>
      </Box>
    );
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>  
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"row"} gap={2}>
            <Stack direction={'column'} width="30%">
              <Controller
                name    = "partner_id"
                control = {control}
                rules   = {{ required: {
                  value  : true,
                  message: "Partner fields is required"
                },
                }}
                render  = { ({ 
                    field     : { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (

                  <Autocomplete
                    disablePortal
                    fullWidth
                    id                   = "select-partner"
                    options              = {partnerOptions}
                    onChange             = {(e, data) => onChange(data)}
                    value                = {value}
                    sx                   = {{ mb: 2 }}
                    isOptionEqualToValue = {(option:any, value:any) => option.value === value.value}
                    getOptionLabel       = {(option:any) => option.label}
                    renderInput          = { (params: any) => 
                      <TextField 
                        {...params}
                        helperText = {error ? error.message : null}
                        size       = "medium"
                        error      = {!!error}
                        type       = 'string'
                        label      = {"Partner"}
                        variant    = "outlined"
                      />
                    }
                  />
                  )
                }
              />

              <Controller
                name    = "batchno"
                control = {control}
                rules   = {{ required: {
                  value  : true,
                  message: "No Batch fields is required"
                }}}
                render  = { ({ 
                    field     : { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                  <TextField
                    helperText = {error ? error.message : null}
                    size       = "medium"
                    error      = {!!error}
                    onChange   = {onChange}
                    type       = 'string'
                    value      = {value}
                    label      = {"No Batch"}
                    variant    = "outlined"
                    sx         = {{mb:2}}
                    fullWidth
                  />
                  )
                }
              />

              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Submit
              </Button>
            </Stack>
            <Stack direction={'column'} width="70%">
              <div style={{
                width  : '100%',
                height : 450,
                // display: 'grid',
              }}>
                <DataGrid 
                  getRowId              = { (row: any) => row.id }
                  sx                    = {{ overflowX: 'scroll' }}
                  rows                  = {linePayment}
                  columns               = {lineColumn}
                  scrollbarSize         = {5}
                  disableColumnMenu     = {true}
                  columnVisibilityModel = {{ id: false, payment: false, }}
                  hideFooterPagination  = {true}
                  slots                 = {{
                    footer: FooterGrandTotal,
                  }}
                />
              </div>
            </Stack>

          </Stack>
        </form>
      </LocalizationProvider>

      <ModalComponent
        modalOpen    = {openEditModal}
        modalOnClose = {handleCloseEditModal}
        modalSize    = 'sm'
        modalTitle   = 'Edit Payment Line'
      >
        <PaymentEditLine modalOnClose={handleCloseEditModal} invoice_line_id={editPaymentLineID} getData={doGetPayment}/>
      </ModalComponent>

      <ModalConfirmComponent
        modalId      = 'payment-line-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onSubmit     = {handleDeletePaymentLine} 
        modalTitle   = {"Delete Confirmation"}
        modalText    = {"Do you want to delete this record?"}
        buttonText   = {"Delete"}
        buttonColor  = {"error"}
      />
    </>
  )
}
