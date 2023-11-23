import React from 'react'
import { TextField, Button, Stack, Switch, FormControl, FormLabel, FormGroup, FormHelperText, FormControlLabel} from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { usePartnerCreate } from '@/hooks/partner/use-create'
export interface PartnerCreateFormPropsRequest {
  name     : string | undefined,
  bpcode   : string | undefined,
  dn_amount: number | undefined,
  cn_amount: number | undefined,
  isactive : boolean | undefined,
}
export default function PartnerCreate({modalOnClose, getData}:any) {
  
  const { mutate: submitCreatePartner, isLoading } = usePartnerCreate({closeModal: ()=>modalOnClose(), getData: () => getData()});
  
  const { 
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerCreateFormPropsRequest>({
    defaultValues: {
      name     : '',
      bpcode   : '',
      dn_amount: 0,
      cn_amount: 0,
      isactive : false
    }
  })

  const onSubmit: SubmitHandler<PartnerCreateFormPropsRequest> = (data) => {
    submitCreatePartner(data)
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

          <Stack direction={'row'} spacing={2}>
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
                  onChange   = {(event) => onChange(+event.target.value)}
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
                  onChange   = {(event) => onChange(+event.target.value)}
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
          </Stack>
          
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
