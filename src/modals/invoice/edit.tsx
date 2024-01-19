import React from 'react'
import { TextField, Button, Stack, Switch, FormControlLabel, MenuItem, Box} from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import 'dayjs/locale/en-gb';
import moment from 'moment'
import { usePartnerGet } from '@/hooks/partner/use-get';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { useInvoiceEdit } from '@/hooks/invoice/use-edit';
import { useInvoiceGetOne } from '@/hooks/invoice/use-get-one';
import { useInvoiceLineDelete } from '@/hooks/invoice/use-delete-line';
import ModalConfirmComponent from '@/components/modalconfirm.component';
import ModalComponent from '@/components/modal.component';
import InvoiceEditLine from './edit_line';

export default function InvoiceEdit({modalOnClose, invoice_id, getData}:any) {

  // const [openAddLineModal, setOpenAddLineModal]                      = React.useState(false);
  // const handleOpenAddLineModal                                       = () => setOpenAddLineModal(true);
  // const handleCloseAddLineModal                                      = () => setOpenAddLineModal(false);
  const [partnerOptions, setPartnerOptions]           = React.useState([])
  const [lineInvoice, setLineInvoice]                 = React.useState<any[]>([])
  const [deleteInvoiceLineID, setDeleteInvoiceLineID] = React.useState('');
  const [editInvoiceLineID, setEditInvoiceLineID]     = React.useState('');
  const [openDeleteModal, setOpenDeleteModal]         = React.useState(false);
  const [openEditModal, setOpenEditModal]             = React.useState(false);

  const { refetch: doGetPartner, data: dataPartner, isLoading: isLoadingPartner } = usePartnerGet({
    field : 'id',
    sort  : 'asc',
    limit : '999',
    offset: '',
    q     : '',
  });
  
  const { 
    watch,
    control,
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      discount    : '',
      batchno     : '',
      ispercentage: false,
      partner_id  : '',
      pay_date    : '',
      docaction   : '',
      grand_total : 0,
    }
  })

  const loadData = (data: any) => {
    reset({
      discount    : data.data.discount,
      batchno     : data.data.batchno,
      ispercentage: data.data.ispercentage,
      partner_id  : data.data.partner.id,
      pay_date    : dayjs(data.data.pay_date).format('DD-MM-YYYY').toString(),
      grand_total : data.data.grand_total,
    })
    
    const rows    = data.data.line.map( (val: any,idx: number) => ({line_id: idx, ...val}) )
    // data.data.line.map((val) => ({

    // }))
    setLineInvoice(rows);
  }
  
  
  
  // const deleteLineInvoice = () => {
  //   setLineInvoice( (prevList) => prevList.filter( (row:any) => row.line_id !== deleteInvoiceLineID))
  // };


  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal  = (invoice_line_id: string) => {
    setDeleteInvoiceLineID(invoice_line_id)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDeleteLine, isLoading: isLoadIngDeleteLine } = useInvoiceLineDelete({ modalClose: handleCloseDeleteModal ,updateTable: () => doGetInvoice() });
  
  const handleDeleteInvoiceLine = () => {
    submitDeleteLine({invoice_line_id: deleteInvoiceLineID})
  }


  const handleOpenEditModal  = (invoice_id: string) => {
    setEditInvoiceLineID(invoice_id);
    setOpenEditModal(true);
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditInvoiceLineID('');
  }


  const { mutate: submitEditInvoice, isLoading }                        = useInvoiceEdit({closeModal: ()=>modalOnClose(), invoice_id: invoice_id, getData: () => getData()});
  const { refetch: doGetInvoice, data, isLoading: isLoadingGetPartner } = useInvoiceGetOne(invoice_id, (dataOriginal: any)=>loadData(dataOriginal));

  const [lineColumn, setLineColumn]  = React.useState([
      { field: 'id', headerName: 'ID', type : 'string', flex : 0.3, filterble: false },
      { field: 'no', headerName: 'No', type: 'number', width: 10, filterble : false, sortable: false,
        renderCell: (params: any) => params.api.getAllRowIds().indexOf(params.id)+1
      },
      { field: 'product_id', headerName: 'Product', type : 'string', minWidth: 250, filterble: false,
        valueGetter: (params: GridRenderCellParams) => params.row.product.id 
      },
      { field: 'product', headerName: 'Product', type : 'string', minWidth: 250, filterble: false,
        valueGetter: (params: GridRenderCellParams) => params.row.product.name 
      },
      { field: 'invoice', headerName: 'Invoice ID', type : 'string', minWidth: 250, filterble: false,
        valueGetter: (params: GridRenderCellParams) => params.row.invoice.id 
      },
      { field: 'qty', headerName: 'Qty', type : 'string', minWidth: 100, filterble: false },
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
    const discount     = parseFloat(getValues('discount') || '0')
    const ispercentage = getValues('ispercentage')

    let total = 0;
    lineInvoice.forEach((value: any) => {
      total = total + value.total
    })
    
    if(ispercentage == true){
      total = total - ( (discount/100)*total );
    }
    else{
      total = total - discount;
    }

    setValue('grand_total',total)
  }

  const onSubmit: SubmitHandler<{}> = (data: any) => {

    const createObj = {
      batchno     : data.batchno,
      discount    : parseFloat(data.discount),
      ispercentage: data.ispercentage,
      partner_id  : data.partner_id,
    }

    submitEditInvoice(createObj)
  }

  const onDiscountChange = (onChange: any, event: any) => {
    const re = /^[0-9]*\.?[0-9]*$/;

    // if value is not blank, then test the regex
    if (event.target.value === '' || re.test(event.target.value)) {
      if(getValues('ispercentage') == true){
        if(event.target.value >= 100) {
          onChange(event)
          setValue('discount', '100')
        } 
        else{
          // setValue('discount', event.target.value)
          onChange(event)
        }
      }
      else{
        // setValue('discount', event.target.value)
        onChange(event)
      }
      countGrandTotal()
    }
  }

  const onPercentageChange = (onChange: any, event:any) => {
    if(event.target.checked == true){
      if( parseInt(getValues('discount') || '0') >= 100){
        
        setValue('discount', '100')
      }
    }
    onChange(event)
    countGrandTotal()
    // setValue('ispercentage', event.target.checked);
  }

  React.useEffect( () => {
    countGrandTotal();
    console.log(lineInvoice);
  }, [lineInvoice])

  React.useEffect(() => {
    getDataPartner();
    doGetInvoice();
  },[])

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
                  <TextField
                    helperText = {error ? error.message : null}
                    size       = "medium"
                    error      = {!!error}
                    onChange   = {onChange}
                    type       = 'string'
                    value      = {value}
                    label      = {"Partner"}
                    variant    = "outlined"
                    sx         = {{mb:2}}
                    select
                    fullWidth
                  >
                    {
                      partnerOptions.map((option: {label: string, value: string}) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    }
                  </TextField>
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

              <Controller
                name    = "pay_date"
                control = {control}
                rules   = {{ required: {
                  value  : true,
                  message: "Pay Date fields is required"
                }}}
                render  = { ({ 
                    field     : { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <DatePicker
                      label     = {"Pay Date"}
                      value     = {dayjs(value,'DD-MM-YYYY')}
                      format    = 'DD-MM-YYYY'
                      onChange  = {onChange}
                      disabled   = {true}
                      sx        = {{mb:2}}
                      slotProps = {{
                        textField: {
                          error     : !!error,
                          helperText: error ? error.message: null,
                        },
                      }}
                    />
                  // <TextField
                  //   // helperText = {error ? error.message : null}
                  //   size       = "medium"
                  //   error      = {!!error}
                  //   onChange   = {onChange}
                  //   type       = 'string'
                  //   value      = {value}
                  //   label      = {"Pay Date"}
                  //   variant    = "outlined"
                  //   sx         = {{mb:2}}
                  //   fullWidth
                  // />
                  )
                }
              />
              
              <Stack direction={"row"} gap={2}>
                <Controller
                  name    = "discount"
                  control = {control}
                  rules   = {{ required: {
                    value  : true,
                    message: "Discount fields is required"
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
                      onChange   = {e => onDiscountChange(onChange, e)}
                      type       = 'string'
                      value      = {value}
                      label      = {"Discount"}
                      variant    = "outlined"
                      sx         = {{mb:2, width: '50%'}}
                      // inputProps={{
                      //   // max      : '100',
                      //   maxLength: '3'
                      // }}
                      // fullWidth
                    />
                    )
                  }
                />

                <Controller
                  name    = "ispercentage"
                  control = {control}
                  // rules   = {{ required: {
                  //   value  : true,
                  //   message: "Active fields is required"
                  // }}}
                  render  = { ({ 
                      field     : { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <FormControlLabel
                        label          = {value ? "Percent" : "Nominal"}
                        value          = {"start"}
                        labelPlacement = {"start"}
                        onChange       = {onChange}
                        control        = {
                          <Switch
                            checked    = {value}
                            disabled   = {false}
                            onChange   = {e => onPercentageChange(onChange, e)}
                            inputProps = {{ 'aria-label': 'controlled' }}
                            // sx         = {{mb:2}}
                          />
                        }
                        sx={{
                          display      : "flex",
                          flexDirection: "row",
                          margin       : 0,
                          mb           : 2,
                          width        : '50%'
                        }}
                      />
                    )
                  }
                />
              </Stack>
              
              <Controller
                name    = "grand_total"
                control = {control}
                render  = { ({ 
                    field     : { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                  <TextField
                    helperText = {error ? error.message : null}
                    size       = "medium"
                    error      = {!!error}
                    // onChange   = {onChange}
                    type       = 'number'
                    disabled   = {true}
                    value      = {value}
                    label      = {"Grand Total"}
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
                  rows                  = {lineInvoice}
                  columns               = {lineColumn}
                  scrollbarSize         = {5}
                  disableColumnMenu     = {true}
                  columnVisibilityModel = {{ id: false, invoice: false, product_id: false }}
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
        modalTitle   = 'Edit Invoice Line'
      >
        <InvoiceEditLine modalOnClose={handleCloseEditModal} invoice_line_id={editInvoiceLineID} getData={doGetInvoice}/>
        {/* <PartnerEdit modalOnClose={handleCloseEditModal} partner_id={editPartnerID} getData={getDataPartner}/> */}
      </ModalComponent>

      <ModalConfirmComponent
        modalId      = 'invoice-line-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onDelete     = {handleDeleteInvoiceLine} 
      />
    </>
  )
}
