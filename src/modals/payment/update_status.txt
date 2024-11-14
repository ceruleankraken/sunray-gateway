import React from 'react'
import { TextField, Button, Stack, Switch, FormControlLabel, MenuItem, Box, Autocomplete} from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import 'dayjs/locale/en-gb';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { useInvoiceEdit } from '@/hooks/invoice/use-edit';
import { useInvoiceGetOne } from '@/hooks/invoice/use-get-one';
import { useInvoiceLineDelete } from '@/hooks/invoice/use-delete-line';
import ModalConfirmComponent from '@/components/modalconfirm.component';
import ModalComponent from '@/components/modal.component';
import InvoiceEditLine from './edit_line';
import { usePartnerGetActive } from '@/hooks/partner/use-get-active';
import { usePartnerGetOne } from '@/hooks/partner/use-get-one';
import { usePaymentGetOne } from '@/hooks/payment/use-get-one';
import { usePaymentEdit } from '@/hooks/payment/use-edit';

export default function PaymentUpdatestatus({modalOnClose, payment_id, getData}:any) {

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
    batchno    : string,
    partner_id : {} | null,
    docaction  : {} | null,
    grand_total: string,
  }>({
    defaultValues: {
      docaction  : null,
      batchno    : '',
      partner_id : null,
      grand_total: '',
    }
  })

  const loadData = (data: any) => {
    // console.log(data);
    reset({
      batchno     : data.data.batchno,
      partner_id  : data.data.partner ? {value: data.data.partner.id, label: data.data.partner.name} : null,
      grand_total : data.data.grand_total,
    })
    
    const rows    = data.data.line.map( (val: any,idx: number) => ({line_id: idx, ...val}) )
  }

  const { refetch: doGetPayment, data, isLoading: isLoadingGetPayment } = usePaymentGetOne(payment_id, (dataOriginal: any)=>loadData(dataOriginal));
  const { mutate: submitEditPayment, isLoading }                        = usePaymentEdit({closeModal: ()=>modalOnClose(), payment_id: payment_id, getData: () => getData()});
 
  const onSubmit: SubmitHandler<{}> = (data: any) => {

    const createObj = {
      batchno     : data.batchno,
      discount    : parseFloat(data.discount),
      ispercentage: data.ispercentage,
      partner_id  : data.partner_id.value,
      docaction   : data.docaction.value,
    }
    submitEditPayment(createObj)
  }

  React.useEffect(() => {
    doGetPayment();
  },[])
  
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>  
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"row"} gap={2}>
            <Stack direction={'column'} width={'100%'}>
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
                    disabled
                    id                   = "select-partner"
                    options              = {[]}
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
                  // <TextField
                  //   helperText = {error ? error.message : null}
                  //   size       = "medium"
                  //   error      = {!!error}
                  //   onChange   = {onChange}
                  //   type       = 'string'
                  //   value      = {value}
                  //   disabled   = {true}
                  //   label      = {"Partner"}
                  //   variant    = "outlined"
                  //   sx         = {{mb:2}}
                  //   fullWidth
                  // />
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
                    disabled   = {true}
                    label      = {"No Batch"}
                    variant    = "outlined"
                    sx         = {{mb:2}}
                    fullWidth
                  />
                  )
                }
              />

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
              
              <Controller
                name    = "docaction"
                control = {control}
                rules   = {{ required: {
                  value  : true,
                  message: "Status fields is required"
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
                    id                   = "select-status"
                    options              = {[
                      {value: 'IP', label: 'IP - IN PROGRESS'},
                      {value: 'CO', label: 'CO - COMPLETE'},
                      {value: 'VO', label: 'VO - VOID'},
                    ]}
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
                        label      = {"Status"}
                        variant    = "outlined"
                      />
                    }
                  />
                  )
                }
              />

              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Submit
              </Button>
            </Stack>

          </Stack>
        </form>
      </LocalizationProvider>
    </>
  )
}
