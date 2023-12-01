import React, { useEffect, useState } from 'react'
import { TextField, Button, Stack } from '@mui/material'
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import { ProductEditFormPropsRequest } from '@/services/product/edit';
import { useProductEdit } from '@/hooks/product/use-edit';
import { useProductGetOne } from '@/hooks/product/use-get-one';

export default function ProductEdit({modalOnClose, product_id, getData}:any) {
  
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
  } = useForm<ProductEditFormPropsRequest>({
    defaultValues: {
      name       : '',
      value      : '',
      upc        : '',
      description: '',
    }
  })

  const loadData = (data: any) => {
    reset({
      name       : data.name,
      value      : data.value,
      upc        : data.upc,
      description: data.description,
    })
  }
  
  const { mutate: submitEditProduct, isLoading: isLoadingEditPartner }  = useProductEdit({closeModal: ()=>modalOnClose(), product_id, getData: () => getData()});
  const { refetch: doGetPartner, data, isLoading: isLoadingGetPartner } = useProductGetOne(product_id, (dataOriginal: any)=>loadData(dataOriginal));

  useEffect( () => {
    doGetPartner().then(
      (resp: any) => {
        console.log(resp);
      } 
    )
  },[])

  const onSubmit: SubmitHandler<ProductEditFormPropsRequest> = (data) => {
    submitEditProduct(data)
  }
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'}>
          <Controller
            name    = "name"
            control = {control}
            // rules   = {{ 
            //   required: {
            //   value  : true,
            //   message: "Name fields is required"
            // },
            // }}
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
            name    = "value"
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
                helperText = {error ? error.message : null}
                size       = "medium"
                error      = {!!error}
                onChange   = {onChange}
                type       = 'string'
                value      = {value}
                label      = {"Value"}
                variant    = "outlined"
                sx         = {{mb:2}}
                disabled   = {true}
                fullWidth
              />
              )
            }
          />

          <Controller
            name    = "upc"
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
          
          <Button type={'submit'} variant={'contained'} color={'secondary'}>
            Submit
          </Button>
        </Stack>
      </form>
    </>
  )
}
