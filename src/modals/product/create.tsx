import React from 'react'
import { TextField, Button, Stack, Switch, FormControl, FormLabel, FormGroup, FormHelperText, FormControlLabel} from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { ProductCreateFormPropsRequest } from '@/services/product/create';
import { useProductCreate } from '@/hooks/product/use-create';

export default function ProductCreate({modalOnClose, getData}:any) {
  
  const { mutate: submitCreateProduct, isLoading } = useProductCreate({closeModal: ()=>modalOnClose(), getData: () => getData()});
  
  const { 
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductCreateFormPropsRequest>({
    defaultValues: {
      name       : '',
      description: '',
      value      : '',
      upc        : '',
    }
  })

  const onSubmit: SubmitHandler<ProductCreateFormPropsRequest> = (data) => {
    submitCreateProduct(data)
  }
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'}>
          <Controller
            name    = "name"
            control = {control}
            rules   = {{ 
              required: {
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
            name    = "value"
            control = {control}
            // rules   = {{ required: {
            //   value  : true,
            //   message: "DN Amount fields is required"
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
                onChange   = {(event) => onChange(+event.target.value)}
                type       = 'string'
                value      = {value}
                label      = {"Value"}
                variant    = "outlined"
                sx         = {{mb:2}}
                fullWidth
              />
              )
            }
          />

          <Controller
            name    = "upc"
            control = {control}
            // rules   = {{ required: {
            //   value  : true,
            //   message: "CN Amount fields is required"
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
                onChange   = {(event) => onChange(+event.target.value)}
                type       = 'string'
                value      = {value}
                label      = {"UPC"}
                variant    = "outlined"
                sx         = {{mb:2}}
                fullWidth
              />
              )
            }
          />
          
          <Controller
            name    = "description"
            control = {control}
            // rules   = {{ required: {
            //   value  : true,
            //   message: "BP Code fields is required"
            // }}}
            render  = { ({ 
                field     : { onChange, value },
                fieldState: { error },
                formState,
              }) => (
                <TextField
                  size        = "medium"
                  onChange    = {(event) => onChange(+event.target.value)}
                  placeholder = 'Description'
                  value       = {value}
                  label       = {"Description"}
                  variant     = "outlined"
                  sx          = {{mb:2}}
                  multiline
                  fullWidth
                />
              )
            }
          />

          <Button type={'submit'} variant={'contained'} color={'primary'}>
            Submit
          </Button>
        </Stack>
      </form>
    </>
  )
}
