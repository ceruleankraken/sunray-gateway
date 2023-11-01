import React from 'react'
import { Button, Stack} from '@mui/material'
import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import { PartnerCreateFormPropsRequest, usePartnerCreate } from '@/hooks/partner/use-create'


export default function PartnerCreate({modalOnClose}:any) {
  
  const { mutate: submitCreatePartner, isLoading } = usePartnerCreate(modalOnClose);
  const onSubmit                                   = (data: PartnerCreateFormPropsRequest) => {
    // setValues(data)
    console.log("test partner")
    submitCreatePartner(data)
  }
  // const defaultValues: FormProps = {hallo: ''}
  

  return (
    <>
      <FormContainer onSuccess={onSubmit}>
        <Stack direction={'column'}>
          <TextFieldElement
            sx    = {{ mb:2 }}
            name  = {'name'}
            label = {'Name'}
            type  = 'string'
            required
          />
          <TextFieldElement
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
          />
          <Button type={'submit'} variant={'contained'} color={'primary'}>
            Submit
          </Button>
        </Stack>
      </FormContainer>
    </>
  )
}
