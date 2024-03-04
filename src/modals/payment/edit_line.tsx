import React from 'react'
import { TextField, Button, Stack, Switch, FormControlLabel, MenuItem, Autocomplete} from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useInvoiceLineEdit } from '@/hooks/invoice/use-edit-line';
import { useInvoiceLineGetOne } from '@/hooks/invoice/use-get-line';
import { useProductGetActive } from '@/hooks/product/use-get-active';
import { useInvoiceGetActive } from '@/hooks/invoice/use-get-active';
import { usePaymentLineEdit } from '@/hooks/payment/use-edit-line';
import { AlertWarning } from '@/utils/notification';
import { usePaymentLineGetOne } from '@/hooks/payment/use-get-line';

export default function PaymentEditLine({modalOnClose, payment_line_id, getData, partner_id}:any) {

  const [checkValid, setCheckValid]                                  = React.useState(true)
  const [invoiceOptions, setInvoiceOptions]                          = React.useState([])
  const [outstandingInvoice, setOutstandingInvoice]                  = React.useState(0);
  const { refetch: doGetInvoice, data, isLoading: isLoadingInvoice } = useInvoiceGetActive({partnerID: partner_id});

  const { 
    watch,
    control,
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{
    invoice_id  : {value: string, outstanding: number, label: string} | null,
    price       : string,
    discount    : string,
    ispercentage: boolean,
    amount      : number,
    total       : number,
  }>({
    defaultValues: {
      invoice_id  : null,
      price       : '',
      discount    : '0',
      ispercentage: true,
      amount      : 0,
      total       : 0,
    }
  })

  const loadData = (data: any) => {
    // console.log(data)
    reset({
      // invoice_id  : data.data.invoice.id,
      invoice_id  : data.data.invoice ? {value: data.data.invoice.id, outstanding: data.data.invoice.outstanding, label: data.data.invoice.documentno} : null,
      price       : data.data.price.toString(),
      discount    : data.data.discount.toString(),
      ispercentage: data.data.ispercentage,
      amount      : parseInt(data.data.amount),
      total       : (data.data.price)-(data.data.discount/100*(data.data.price)),
    })
    setOutstandingInvoice(data.data.invoice.outstanding)
  }
  
  const { refetch: doGetPaymentLine, data: dataLine, isLoading: isLoadingGetPaymentLine } = usePaymentLineGetOne(payment_line_id, (dataOriginal: any)=>loadData(dataOriginal));


  const { mutate: submitEditPaymentLine, isLoading }= usePaymentLineEdit({closeModal: ()=>modalOnClose(), payment_line_id: payment_line_id, getData: () => getData()});

  const onSubmit: SubmitHandler<{}> = (data: any) => {
    // const selectedProduct: any = productOptions.filter( (product: any) => product.value == data.product_id);
    
    let newData            = {...data, invoice_name: data.invoice_id.label}
        newData.invoice_id = data.invoice_id.value
    submitEditPaymentLine(newData);
  }

  const getDataInvoice = () => {
    doGetInvoice().then(
      (resp: any) => {
        if(resp.status == 'error') {
        }
        else {
          const rows    = resp.data.data.map( (val: any,idx: number) => ({value: val.id, outstanding: val.outstanding ,label: (val.documentno).toUpperCase()}) )
          setInvoiceOptions(rows);
        }
      } 
    )
  }

  const countTotal = () => {
    const price        = parseInt(getValues('price') || '0')
    const discount     = parseFloat(getValues('discount') || '0')
    const ispercentage = getValues('ispercentage')
    // const amount       = parseInt(getValues('amount') || '0')

    let hitung = price;
    setValue('amount',hitung);
    let total  = 0;
    if(ispercentage == true){
      total = hitung - ( (discount/100)*hitung );
    }
    else{
      total = hitung - discount;
    }

    if(total<0){
      setCheckValid(false);
    }else{
      setCheckValid(true);
    }
    setValue('total',total)
  }

  const onPriceChange = (onChange: any, event: any) => {
    const re = /^[0-9\b]+$/;

    if (event.target.value === '' || re.test(event.target.value)) {
      if (event.target.value.substring(0, 1) == '0'){
        event.target.value = event.target.value.substring(1);
      }

      if(event.target.value > outstandingInvoice){
        return AlertWarning('Melebihi invoice!')
      }
      else {
        onChange(event)
        countTotal();
      }
    }
  }

  const onDiscoutnChange = (onChange: any, event: any) => {
    const re = /^[0-9]*\.?[0-9]*$/;
    // /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (event.target.value === '' || re.test(event.target.value)) {
      if (event.target.value.substring(0, 1) == '0'){
        event.target.value = event.target.value.substring(1);
      }

      if(getValues('ispercentage') == true){
        if(event.target.value >= 100) {
          onChange(event)
          setValue('discount', '100')
        } 
        else{
          onChange(event)
        }
      }
      else{
        onChange(event)
      }
      countTotal();
    }
  }

  const onPercentageChange = (onChange: any, event:any) => {
    // console.log(event.target);
    if(event.target.checked == true){

      if( parseInt(getValues('discount') || '0') >= 100){
        setValue('discount', '100')
      }
    }

    onChange(event)
    countTotal();
  }
  
  React.useEffect(() => {
    doGetPaymentLine();
    getDataInvoice();
  },[])
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'}>
          <Controller
            name    = "invoice_id"
            control = {control}
            rules   = {{ required: {
              value  : true,
              message: "Invoice fields is required"
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
                id                   = "select-invoice"
                options              = {invoiceOptions}
                value                = {value}
                onChange             = {(e, data) => {onChange(data); setOutstandingInvoice(data?.outstanding || 0); }}
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
                    label      = {"Invoice"}
                    variant    = "outlined"
                  />
                }
              />
              )
            }
          />

          <Stack direction={"row"} gap={2}>
            <Controller
              name    = "price"
              control = {control}
              rules   = {{ required: {
                value  : true,
                message: "Price fields is required"
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
                  onChange   = {e => onPriceChange(onChange, e)}
                  type       = 'string'
                  value      = {value}
                  label      = {"Price"}
                  variant    = "outlined"
                  sx         = {{mb:2}}
                  fullWidth
                />
                )
              }
            />

            <TextField
              size       = "medium"
              type       = 'string'
              value      = {outstandingInvoice}
              label      = {"Outstanding"}
              variant    = "outlined"
              sx         = {{mb:2}}
              InputProps = {{
                readOnly: true,
              }}
              fullWidth
            />
          </Stack>
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
                  onChange   = {e => onDiscoutnChange(onChange, e)}
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
            name    = "amount"
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
                disabled   = {true}
                type       = 'string'
                value      = {value}
                label      = {"Amount"}
                variant    = "outlined"
                sx         = {{mb:2}}
                fullWidth
              />
              )
            }
          />

          <Controller
            name    = "total"
            control = {control}
            // rules   = {{ required: {
            //   value  : true,
            //   message: "Amount fields is required"
            // }}}
            render  = { ({ 
                field     : { onChange, value },
                fieldState: { error },
                formState,
              }) => (
              <TextField
                helperText = {error ? error.message : null}
                size       = "medium"
                error      = {!!error}
                disabled   = {true}
                // onChange   = {onAmountChange}
                type       = 'string'
                value      = {value}
                label      = {"Total"}
                variant    = "outlined"
                sx         = {{mb:2}}
                fullWidth
              />
              )
            }
          />
          <Button 
            type     = {'submit'}
            variant  = {'contained'}
            color    = {'primary'}
            disabled = {!checkValid}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  )
}
