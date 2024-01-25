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
import InvoiceAddLine from './add_line';
import dayjs from 'dayjs';
import { usePartnerGetActive } from '@/hooks/partner/use-get-active';

export default function InvoiceCreate({modalOnClose, getData}:any) {

  const [openAddLineModal, setOpenAddLineModal]                      = React.useState(false);
  const [grandTotal, setGrandTotal]                                  = React.useState(0);
  const handleOpenAddLineModal                                       = () => setOpenAddLineModal(true);
  const handleCloseAddLineModal                                      = () => setOpenAddLineModal(false);
  const [partnerOptions, setPartnerOptions]                          = React.useState([])
  const { refetch: doGetPartner, data, isLoading: isLoadingPartner } = usePartnerGetActive();

  const { mutate: submitCreateInvoice, isLoading } = useInvoiceCreate({closeModal: ()=>modalOnClose(), getData: () => getData()});
  const [lineInvoice, setLineInvoice]              = React.useState<any[]>([])
  const deleteLineInvoice                          = React.useCallback((index:number) => {
    setLineInvoice( (prevList) => prevList.filter( (row:any) => row.line_id !== index))
  },[]);

  const lineColumn  = React.useMemo<GridColDef<any>[]>(
    () => [
      { field: 'line_id', headerName: 'ID', type : 'string', flex : 0.3, filterble: false },
      { field: 'no', headerName: 'No', type: 'number', width: 10, filterble : false, sortable: false,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
      },
      { field: 'product_name', headerName: 'Product', type : 'string', minWidth: 250, filterble: false },
      { field: 'qty', headerName: 'Qty', type : 'string', minWidth: 100, filterble: false },
      { field: 'price', headerName: 'Price', type : 'string', minWidth: 100, filterble: false },
      { field: 'amount', headerName: 'Amount', type : 'string', minWidth: 100, filterble: false },
      { field: 'total', headerName: 'Total', type : 'string', minWidth: 150, filterble: false },
      { field: 'action', type: 'actions', width:50, getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          key     = {"delete-"+params.id}
          icon    = {<DeleteIcon />}
          label   = "Delete"
          onClick = {() => deleteLineInvoice(params.row.line_id)}
          showInMenu
        />,
      ]},
    ],
    [deleteLineInvoice],
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
      discount    : '0',
      batchno     : '',
      ispercentage: false,
      partner_id  : '',
      pay_date    : '',
      // grand_total : 0,
    }
  })

  
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

    // setValue('grand_total',total)
    setGrandTotal(total)
  }

  const submitAddLineInvoice = (data:any) => {
    // const lineLength = lineInvoice.length;
    let   newData    = {line_id: Date.now().toString(), ...data }

    const check = lineInvoice.filter( (val) => val.product_id == newData.product_id)

    if(check.length > 0) {
      return false;
    }
    else {
      setLineInvoice( (prev) => [...prev, newData ])
      return true;
    }
  }

  const onSubmit: SubmitHandler<{}> = (data: any) => {
    const createObj = {
      header : {
        batchno     : data.batchno,
        discount    : data.discount,
        ispercentage: data.ispercentage,
        partner_id  : data.partner_id,
        pay_date    : dayjs(data.pay_date).format('DD-MM-YYYY'),
      },
      line: lineInvoice,
    }
    submitCreateInvoice(createObj)
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
  },[])

  const FooterGrandTotal = () => {

    const grandTotalRupiah = new Intl.NumberFormat('id-ID', {
      style   : 'currency',
      currency: 'IDR',
    }).format(grandTotal);

    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        Grand Total: {grandTotalRupiah}
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
                    id          = "select-partner"
                    options     = {partnerOptions}
                    onChange    = {onChange}
                    sx          = {{ mb: 2 }}
                    renderInput = { (params: any) => 
                      <TextField 
                        {...params}
                        helperText = {error ? error.message : null}
                        size       = "medium"
                        error      = {!!error}
                        type       = 'string'
                        value      = {value}
                        label      = {"Partner"}
                        variant    = "outlined"
                      />
                    }
                  />
                  // <TextField
                  //   helperText = {error ? error.message : null}
                  //   size       = "medium"
                  //   error      = {!!error}
                  //   onChange   = {onChange}
                  //   type       = 'string'
                  //   value      = {value}
                  //   label      = {"Partner"}
                  //   variant    = "outlined"
                  //   sx         = {{mb:2}}
                  //   select
                  //   fullWidth
                  // >
                  //   {
                  //     partnerOptions.map((option: {label: string, value: string}) => (
                  //       <MenuItem key={option.value} value={option.value}>
                  //         {option.label}
                  //       </MenuItem>
                  //     ))
                  //   }
                  // </TextField>
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
                  variant = {'contained'}
                  color   = {'secondary'}
                  onClick = {handleOpenAddLineModal}
                >
                  ADD LINE INVOICE
                </Button>
              </Box>
              
              {/* <Controller
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
              /> */}

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
                  rows                  = {lineInvoice}
                  columns               = {lineColumn}
                  scrollbarSize         = {5}
                  disableColumnMenu     = {true}
                  columnVisibilityModel = {{ line_id: false }}
                  hideFooterPagination  = {true}
                  slots                 = {{
                    footer: FooterGrandTotal,
                  }}

                  // autoPageSize
                  // pageSizeOptions={[]}
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
        <InvoiceAddLine modalOnClose={handleCloseAddLineModal} onSubmitAdd={submitAddLineInvoice} />
      </ModalComponent>
    </>
  )
}
