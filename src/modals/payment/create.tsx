import React from 'react'
import { TextField, Button, Stack, Switch, FormControl, FormLabel, FormGroup, FormHelperText, FormControlLabel, MenuItem, Box, Autocomplete} from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { usePartnerCreate } from '@/hooks/partner/use-create'
import { PartnerCreateFormPropsRequest } from '@/services/partner/create';
import { useInvoiceCreate } from '@/hooks/invoice/use-create';
import { HeaderInvoice, InvoiceCreateFormPropsRequest, LineInvoice } from '@/services/invoice/create';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';

import moment from 'moment'
import { usePartnerGet } from '@/hooks/partner/use-get';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalComponent from '@/components/modal.component';
import { usePartnerGetActive } from '@/hooks/partner/use-get-active';
import { usePaymentCreate } from '@/hooks/payment/use-create';
import PaymentAddLine from './add_line';
import dayjs from 'dayjs';

export default function PaymentCreate({modalOnClose, getData}:any) {

  const [openAddLineModal, setOpenAddLineModal] = React.useState(false);
  const [grandTotal, setGrandTotal]             = React.useState(0);
  const [lineTotal, setLineTotal]               = React.useState(0);
  const [partnerID, setPartnerID]               = React.useState({label: '', value: ''});
  const handleOpenAddLineModal                  = () => setOpenAddLineModal(true);
  const handleCloseAddLineModal                 = () => setOpenAddLineModal(false);
  const [partnerOptions, setPartnerOptions]     = React.useState([])
  const [linePayment, setLinePayment]           = React.useState<any[]>([])
  const deleteLinePayment                       = React.useCallback((index:number) => {
    setLinePayment( (prevList) => prevList.filter( (row:any) => row.line_id !== index))
  },[]);
  
  const { refetch: doGetPartner, data, isLoading: isLoadingPartner } = usePartnerGetActive();
  const { mutate: submitCreatePayment, isLoading }                   = usePaymentCreate({closeModal: ()=>modalOnClose(), getData: () => getData()});

  const lineColumn  = React.useMemo<GridColDef<any>[]>(
    () => [
      { field: 'line_id', headerName: 'ID', type : 'string', flex : 0.3, filterble: false },
      { field: 'no', headerName: 'No', type: 'number', width: 10, filterble : false, sortable: false,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
      },
      { field: 'invoice_name', headerName: 'No Document', type : 'string', minWidth: 250, filterble: false },
      { field: 'price', headerName: 'Price', type : 'string', minWidth: 100, filterble: false },
      { field: 'amount', headerName: 'Amount', type : 'string', minWidth: 100, filterble: false },
      { field: 'total', headerName: 'Total', type : 'string', minWidth: 150, filterble: false },
      { field: 'action', type: 'actions', width:50, getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          key     = {"delete-"+params.id}
          icon    = {<DeleteIcon />}
          label   = "Delete"
          onClick = {() => deleteLinePayment(params.row.line_id)}
          showInMenu
        />,
      ]},
    ],
    [deleteLinePayment],
  );

  const getDataPartner = () => {
    doGetPartner().then(
      (resp: any) => {
        console.log(resp)
        if(resp.status == 'error') {
        }
        else {
          const rows    = resp.data.data.map( (val: any,idx: number) => ({value: val.id, label: (val.name).toUpperCase()}) )
          setPartnerOptions(rows);
        }
      } 
    )
  }
  
  const { 
    watch,
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      partner_id  : null,
      discount    : '0',
      ispercentage: false,
      pay_date    : '',
      batchno     : '',
    }
  })

  
  const countGrandTotal = () => {
    // const result = lineInvoice.reduce( (total, line:any) => total + line.total)
    const discount     = parseFloat(getValues('discount') || '0')
    const ispercentage = getValues('ispercentage')
    let   lineTotal   = 0;

    let total = 0;
    linePayment.forEach((value: any) => {
      total     = total + value.total;
      lineTotal = lineTotal + value.amount;
    })
    
    if(ispercentage == true){
      total = total - ( (discount/100)*total );
    }
    else{
      total = total - discount;
    }

    // setValue('grand_total',total)
    setLineTotal(lineTotal)
    setGrandTotal(total)
  }

  const submitAddLinePayment = (data:any) => {
    // const lineLength = lineInvoice.length;
    let   newData    = {line_id: Date.now().toString(), ...data }

    const check = linePayment.filter( (val) => val.invoice_id == newData.invoice_id)
    
    if(check.length > 0) {
      return false;
    }
    else {
      setLinePayment( (prev) => [...prev, newData ])
      return true;
    }
  }

  const onSubmit: SubmitHandler<{}> = (data: any) => {
    const createObj = {
      header : {
        batchno     : data.batchno,
        partner_id  : data.partner_id.value,
        pay_date    : dayjs(data.pay_date).format('DD-MM-YYYY'),
        discount    : data.discount,
        ispercentage: data.ispercentage,
      },
      line: linePayment,
    }
    submitCreatePayment(createObj)
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
  }, [linePayment])

  React.useEffect(() => {
    getDataPartner();
  },[])

  const FooterGrandTotal = () => {
    
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
                    onChange             = {(e, data) => {onChange(data); setPartnerID(data);}}
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
                      value     = {value}
                      format    = 'DD-MM-YYYY'
                      onChange  = {onChange}
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
                          flexWrap     : 'wrap',
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


              <Box
                // display        = {'flex'}
                // justifyContent = {'flex-end'}
                marginBottom  = {2}
              >
                <Button
                  fullWidth
                  variant  = {'contained'}
                  color    = {'secondary'}
                  onClick  = {handleOpenAddLineModal}
                  disabled = {(partnerID.value == '')}
                >
                  ADD LINE PAYMENT
                </Button>
              </Box>

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
                  getRowId              = { (row: any) => row.line_id }
                  sx                    = {{ overflowX: 'scroll' }}
                  rows                  = {linePayment}
                  columns               = {lineColumn}
                  scrollbarSize         = {5}
                  disableColumnMenu     = {true}
                  columnVisibilityModel = {{ line_id: false }}
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
        modalOpen    = {openAddLineModal}
        modalOnClose = {handleCloseAddLineModal}
        modalSize    = 'sm'
        modalTitle   = 'Add Line Invoice'
      >
        <PaymentAddLine modalOnClose={handleCloseAddLineModal} onSubmitAdd={submitAddLinePayment} partnerID={partnerID.value} />
      </ModalComponent>
    </>
  )
}
