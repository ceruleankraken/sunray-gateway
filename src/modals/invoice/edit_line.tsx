import React from 'react'
import { TextField, Button, Stack, Switch, FormControlLabel, MenuItem, Autocomplete} from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useInvoiceLineEdit } from '@/hooks/invoice/use-edit-line';
import { useInvoiceLineGetOne } from '@/hooks/invoice/use-get-line';
import { useProductGetActive } from '@/hooks/product/use-get-active';

export default function InvoiceEditLine({modalOnClose, invoice_line_id, getData}:any) {

  const [checkValid, setCheckValid]                                  = React.useState(true)
  const [productOptions, setProductOptions]                          = React.useState([])
  const { refetch: doGetProduct, data, isLoading: isLoadingProduct } = useProductGetActive();

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
    invoice_id  : string,
    product_id  : {} | null,
    qty         : string,
    price       : string,
    discount    : string,
    ispercentage: boolean,
    amount      : number,
    total       : number,
  }>({
    defaultValues: {
      invoice_id  : '',
      product_id  : null,
      qty         : '',
      price       : '',
      discount    : '0',
      ispercentage: true,
      amount      : 0,
      total       : 0,
    }
  })

  const loadData = (data: any) => {
    console.log(data)
    reset({
      invoice_id  : data.data.invoice.id,
      product_id  : data.data.product ? {value: data.data.product.id, label: data.data.product.name} : null,
      qty         : data.data.qty.toString(),
      price       : data.data.price.toString(),
      discount    : data.data.discount.toString(),
      ispercentage: data.data.ispercentage,
      amount      : parseInt(data.data.amount),
      total       : (data.data.qty*data.data.price)-(data.data.discount/100*(data.data.qty*data.data.price)),
    })
  }
  
  const { refetch: doGetInvoiceLine, data: dataLine, isLoading: isLoadingGetInvoiceLine } = useInvoiceLineGetOne(invoice_line_id, (dataOriginal: any)=>loadData(dataOriginal));


  const { mutate: submitEditInvoiceLine, isLoading }= useInvoiceLineEdit({closeModal: ()=>modalOnClose(), invoice_line_id: invoice_line_id, getData: () => getData()});

  const onSubmit: SubmitHandler<{}> = (data: any) => {
    // const selectedProduct: any = productOptions.filter( (product: any) => product.value == data.product_id);
    
    let newData            = {...data, product_name: data.product_id.label}
        newData.product_id = data.product_id.value
    console.log(newData);
    submitEditInvoiceLine(newData);
  }

  const getDataProduct = () => {
    doGetProduct().then(
      (resp: any) => {
        if(resp.status == 'error') {
        }
        else {
          const rows    = resp.data.data.map( (val: any,idx: number) => ({value: val.id, label: (val.name).toUpperCase()}) )
          setProductOptions(rows);
        }
      } 
    )
  }

  const countTotal = () => {
    const qty          = parseInt(getValues('qty') || '0')
    const price        = parseInt(getValues('price') || '0')
    const discount     = parseFloat(getValues('discount') || '0')
    const ispercentage = getValues('ispercentage')
    // const amount       = parseInt(getValues('amount') || '0')

    let hitung = qty*price;
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

  const onQtyChange = (onChange: any, event: any) => {
    const re = /^[0-9\b]+$/;

    if (event.target.value === '' || re.test(event.target.value)) {
      if (event.target.value.substring(0, 1) == '0'){
        event.target.value = event.target.value.substring(1);
      }
      // setValue('qty', event.target.value)
      onChange(event)
      countTotal();
    }
  }
  
  const onPriceChange = (onChange: any, event: any) => {
    const re = /^[0-9\b]+$/;

    if (event.target.value === '' || re.test(event.target.value)) {
      if (event.target.value.substring(0, 1) == '0'){
        event.target.value = event.target.value.substring(1);
      }

      onChange(event)
      countTotal();
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
    doGetInvoiceLine();
    getDataProduct();
  },[])
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'}>
          <Controller
            name    = "product_id"
            control = {control}
            rules   = {{ required: {
              value  : true,
              message: "Product fields is required"
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
                id                   = "select-product"
                options              = {productOptions}
                value                = {value}
                onChange             = {(e, data) => onChange(data)}
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
                    label      = {"Product"}
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
              //   label      = {"Product"}
              //   variant    = "outlined"
              //   sx         = {{mb:2}}
              //   select
              //   fullWidth
              // >
              //   {
              //     productOptions.map((option: {label: string, value: string}) => (
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
            name    = "qty"
            control = {control}
            rules   = {{ required: {
              value  : true,
              message: "Qty fields is required"
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
                onChange   = {e => onQtyChange(onChange, e)}
                type       = 'string'
                value      = {value}
                label      = {"Qty"}
                variant    = "outlined"
                sx         = {{mb:2}}
                fullWidth
              />
              )
            }
          />

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
