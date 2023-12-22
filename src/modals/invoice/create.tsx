import React from 'react'
import { TextField, Button, Stack, Switch, FormControl, FormLabel, FormGroup, FormHelperText, FormControlLabel} from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { usePartnerCreate } from '@/hooks/partner/use-create'
import { PartnerCreateFormPropsRequest } from '@/services/partner/create';
import { useInvoiceCreate } from '@/hooks/invoice/use-create';
import { InvoiceCreateFormPropsRequest } from '@/services/invoice/create';

export default function InvoiceCreate({modalOnClose, getData}:any) {
  
  const { mutate: submitCreateInvoice, isLoading } = useInvoiceCreate({closeModal: ()=>modalOnClose(), getData: () => getData()});
  
  const [lineInvoice, setLineInvoice] = React.useState([{}])
  
  const { 
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      discount    : '',
      batchno     : '',
      ispercentage: false,
      partner_id  : '',
      pay_date    : '',
    }
  })

  const onSubmit: SubmitHandler<{}> = (data) => {
    // submitCreateInvoice(data)
  }
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'}>
          <Controller
            name    = "name"
            control = {control}
            rules   = {{ required: {
              value  : true,
              message: "Name fields is required"
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
                label      = {"Name"}
                variant    = "outlined"
                sx         = {{mb:2}}
                fullWidth
              />
              )
            }
          />

          <Controller
            name    = "bpcode"
            control = {control}
            rules   = {{ required: {
              value  : true,
              message: "BP Code fields is required"
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
                label      = {"BP Code"}
                variant    = "outlined"
                sx         = {{mb:2}}
                fullWidth
              />
              )
            }
          />

          <Controller
            name    = "dn_amount"
            control = {control}
            rules   = {{ required: {
              value  : true,
              message: "DN Amount fields is required"
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
                type       = 'number'
                value      = {value}
                label      = {"DN Amount"}
                variant    = "outlined"
                sx         = {{mb:2}}
                fullWidth
              />
              )
            }
          />

          <Controller
            name    = "cn_amount"
            control = {control}
            rules   = {{ required: {
              value  : true,
              message: "CN Amount fields is required"
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
                type       = 'number'
                value      = {value}
                label      = {"CN Amount"}
                variant    = "outlined"
                sx         = {{mb:2}}
                fullWidth
              />
              )
            }
          />
          
          <Controller
            name    = "isactive"
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
                
                // <FormControl component="fieldset">
                  // <FormLabel component="legend">Active</FormLabel>
                  // <FormGroup aria-label="position" row>
                    <FormControlLabel
                      label          = {value ? "Active" : "Inactive"}
                      value          = {"start"}
                      labelPlacement = {"start"}
                      onChange       = {onChange}
                      control        = {
                        <Switch
                          checked    = {value}
                          disabled   = {true}
                          onChange   = {onChange}
                          inputProps = {{ 'aria-label': 'controlled' }}
                          // sx         = {{mb:2}}
                        />
                      }
                      sx={{
                        display      : "flex",
                        flexDirection: "row",
                        margin       : 0,
                        mb           : 2

                      }}
                    />
                  // </FormGroup>
                // </FormControl>
              // <TextField
              //   helperText = {error ? error.message : null}
              //   size       = "medium"
              //   error      = {!!error}
              //   onChange   = {onChange}
              //   type       = 'number'
              //   value      = {value}
              //   label      = {"CN Amount"}
              //   variant    = "outlined"
              //   sx         = {{mb:2}}
              //   fullWidth
              // />
              )
            }
          />
          {/* <TextFieldElement
            sx    = {{ mb:2 }}
            name  = {'name'}
            label = {'Name'}
            type  = 'string'
            required
          /> */}
          {/* <TextFieldElement
            sx    = {{ mb:2 }}
            color = {'primary'}
            name  = {'bpcode'}
            label = {'BP Code'}
            type  = 'string'
            required
          />
          <TextFieldElement
            sx    = {{ mb:2 }}
            name  = {'dnamount'}
            label = {'DN Amount'}
            type  = 'number'
            required
          />
          <TextFieldElement
            sx    = {{ mb:2 }}
            name  = {'cnamount'}
            label = {'CN Amount'}
            type  = 'number'
            required
          /> */}
          <Button type={'submit'} variant={'contained'} color={'primary'}>
            Submit
          </Button>
        </Stack>
      </form>
    </>
  )
}
