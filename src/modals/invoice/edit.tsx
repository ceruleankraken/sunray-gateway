import React, { useEffect, useState } from 'react'
import { TextField, Button, Stack, Switch, FormControl, FormLabel, FormGroup, FormHelperText, FormControlLabel} from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { usePartnerEdit } from '@/hooks/partner/use-edit';
import { usePartnerGetOne } from '@/hooks/partner/use-get-one';
import { PartnerEditFormPropsRequest } from '@/services/partner/edit';

export default function PartnerEdit({modalOnClose, partner_id, getData}:any) {
  
  // const [editPartnerData, setEditPertnerData] = useState({
  //   name     : '',
  //   bpcode   : '',
  //   dn_amount: 0,
  //   cn_amount: 0,
  //   isactive : false
  // })
  const { 
    watch,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerEditFormPropsRequest>({
    defaultValues: {
      name     : '',
      bp_code  : '',
      dn_amount: 0,
      cn_amount: 0,
      isactive : false
    }
  })

  const loadData = (data: any) => {
    reset({
      name     : data.name,
      bp_code  : data.bp_code,
      dn_amount: data.dn_amount,
      cn_amount: data.cn_amount,
      isactive : data.isactive,
    })
  }
  
  const { mutate: submitEditPartner, isLoading: isLoadingEditPartner }  = usePartnerEdit({closeModal: ()=>modalOnClose(), partner_id, getData: () => getData()});
  const { refetch: doGetPartner, data, isLoading: isLoadingGetPartner } = usePartnerGetOne(partner_id, (dataOriginal: any)=>loadData(dataOriginal));

  useEffect( () => {
    doGetPartner().then(
      (resp: any) => {
        console.log(resp);
        // console.log(resp.data.data);
        // setEditPertnerData({
        //   // name     : resp.data[0].name,
        //   // bpcode   : resp.data[0].bpcode,
        //   // dn_amount: resp.data[0].dn_amount,
        //   // cn_amount: resp.data[0].cn_amount,
        //   // isactive : resp.data[0].isactive,
          
        //   name     : resp.data.data.name,
        //   bpcode   : resp.data.data.bpcode,
        //   dn_amount: resp.data.data.dn_amount,
        //   cn_amount: resp.data.data.cn_amount,
        //   isactive : resp.data.data.isactive,
        // })
        // reset({
        //   name     : resp.data.data.name,
        //   bpcode   : resp.data.data.bpcode,
        //   dn_amount: resp.data.data.dn_amount,
        //   cn_amount: resp.data.data.cn_amount,
        //   isactive : resp.data.data.isactive,
        // });
      } 
    )
  },[])

  const onSubmit: SubmitHandler<PartnerEditFormPropsRequest> = (data) => {
    console.log("ini data edit");
    console.log(data);
    submitEditPartner(data)
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
              {...register('name')}
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
            name    = "bp_code"
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
          <Button type={'submit'} variant={'contained'} color={'secondary'}>
            Submit
          </Button>
        </Stack>
      </form>
    </>
  )
}
