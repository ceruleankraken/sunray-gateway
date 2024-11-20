import AppLayout from "@/layout/AppLayout"
import BottomBarComponent from "@/layout/BottomBar"
import { Box, Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Paper, TextField, Typography, IconButton, Stack } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { LoginFormPropsRequest, useLogin } from "@/hooks/auth/use-login";
import { useSelector } from 'react-redux';
import { getAccessToken } from "@/stores/features/auth.slice";
import { LoadingButton } from "@mui/lab";
import useRedirect from "@/hooks/other/use-redirect";
import { useTypedSelector } from "@/hooks/other/use-type-selector";
import { useRegister } from "@/hooks/auth/use-register";
import { Delete, FileUploadOutlined } from "@mui/icons-material";
import Image from "next/image";
import theme from "@/utils/theme";

const RegisterPage: NextPage = () => {

  // const router = useRouter();
  // const accessToken = useTypedSelector(
  //   (state) => state.reducer.user.accessToken,
  // );

  // console.log(accessToken);
  // // console.log(!!accessToken === true);

  // useRedirect({
  //   toUrl: '/',
  //   condition: !!accessToken === true,
  // });


  // const { mutate: submitRegister, isLoading } = useRegister();
  
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   const formData: LoginFormPropsRequest = {
  //     username: data.get('username')?.toString() || '',
  //     password: data.get('password')?.toString() || ''
  //   }
  //   submitRegister(formData);

  //   // router.replace('/');
  // };

  
  const [isImageValid, setIsImageValid]                 = React.useState(false);
  const [imageSrc, setImageSrc]                         = React.useState<any>(null);
  
  const { 
    watch,
    control,
    register,
    setValue,
    setError,
    clearErrors,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{
    nama1: string,
    nama2: string,
    nama3: string,
    file : File | null,
  }>({
    defaultValues:{
      nama1: '',
      nama2: '',
      nama3: '',
      file : null,
    }
  })

  const onSubmit: SubmitHandler<{}> = (data: any) => {

    const createObj = {
      batchno     : data.batchno,
      discount    : data.discount,
      ispercentage: data.ispercentage,
      partner_id  : data.partner_id.value,
      docaction   : data.docaction.value,
      file        : data.file,
      image_action: data.image_action,
    }
    // submitEditInvoice(createObj)
    console.log(createObj)
  }

  const onFileChange = (onChange: any, event:any) => {
    clearErrors('file');
    const fileValue = event.target.files[0];
    const fileName  = fileValue?.name;
    const fileSize  = fileValue?.size;
    const fileType  = fileValue?.type;

    if (['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)){
      
      if (fileSize < 1048576) {
        onChange(fileValue)
        setIsImageValid(true)
        // setValue('file_name',fileName);
      }
      else {
        setValue('file', null)
        setError('file', { type:'validate', message: "File size more than 1MB"});
      }
    }
    else {
      setValue('file', null)
      setError('file', { type:'validate', message: "Invalid file type"});
    }
  }

  const handleDeleteImageOrg = () => {
    setValue('file', null)
    setImageSrc('')
    setIsImageValid(false)
  }


  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            my           : 8,
            mx           : 4,
            display      : 'flex',
            flexDirection: 'column',
            alignItems   : 'flex-start',
          }}
        >
          <Typography variant="h2">
            Hello World
          </Typography>
          <Typography variant="body1">
            Hello World
          </Typography>
          
            <Stack
              // direction = {"row"}
              // gap       = {2}
              width = {'100%'}
              sx    = {{
                alignItems               : 'center',
                padding                  : 4,
                '@media (min-width: 0px)': {
                  flexDirection : 'column',
                  justifyContent: 'space-around',
                  gap           : 2,
                  marginY       : 8,
                },
                '@media (min-width: 1024px)': {
                  flexDirection : 'row',
                  justifyContent: 'space-around',
                  gap           : 2,
                  marginY       : 2,
                  // divider      : (<Divider orientation="vertical" flexItem />)
                },
              }}
            >
            {/* <Box
              sx={{
                my           : 8,
                p            : 4,
                width        : '100%',
                display      : 'flex',
                flexDirection: 'row',
                alignItems   : 'center',
                justifyContent: 'space-around'
              }}
            > */}
              <Box
              >
                <Controller
                  name    = "nama1"
                  control = {control}
                  rules   = {{ required: {
                    value  : true,
                    message: "Nama1 fields is required"
                  }}}
                  render  = { ({ 
                      field     : { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <TextField
                        required
                        fullWidth
                        margin     = "normal"
                        name       = "nama"
                        id         = "nama"
                        helperText = {error ? error.message : null}
                        size       = "medium"
                        error      = {!!error}
                        onChange   = {onChange}
                        type       = 'string'
                        value      = {value}
                        label      = {"Nama1"}
                        variant    = "outlined"
                        sx         = {{mb:2}}
                      /> 
                    )
                  }
                />
                <Controller
                  name    = "nama2"
                  control = {control}
                  rules   = {{ required: {
                    value  : true,
                    message: "Nama2 fields is required"
                  }}}
                  render  = { ({ 
                      field     : { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <TextField
                        required
                        fullWidth
                        margin     = "normal"
                        name       = "nama"
                        id         = "nama"
                        helperText = {error ? error.message : null}
                        size       = "medium"
                        error      = {!!error}
                        onChange   = {onChange}
                        type       = 'string'
                        value      = {value}
                        label      = {"Nama2"}
                        variant    = "outlined"
                        sx         = {{mb:2}}
                      /> 
                    )
                  }
                />
                <Controller
                  name    = "nama3"
                  control = {control}
                  // rules   = {{ required: {
                  //   value  : true,
                  //   message: "Nama3 fields is required"
                  // }}}
                  render  = { ({ 
                      field     : { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <TextField
                        // required
                        fullWidth
                        margin     = "normal"
                        name       = "nama"
                        id         = "nama"
                        helperText = {error ? error.message : null}
                        size       = "medium"
                        error      = {!!error}
                        onChange   = {onChange}
                        type       = 'string'
                        value      = {value}
                        label      = {"Nama3"}
                        variant    = "outlined"
                        sx         = {{mb:2}}
                      /> 
                    )
                  }
                />
                <Controller
                  name    = "file"
                  control = {control}
                  rules   = {{ 
                    // required: {
                    //   value  : true,
                    //   message: "File fields is required"
                    // },
                    validate: {
                      validateFile: (val) => {
                        // If the field is empty, it's valid
                        if (!val) return true;
        
                        // Validate file type
                        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                        if (!validTypes.includes(val.type)) {
                          return 'File type must be JPEG, JPG, or PNG';
                        }
        
                        // Validate file size (max 1MB)
                        const fileSize = val.size;
                        if (fileSize > 1 * 1024 * 1024) {
                          return 'File size must be less than 1MB';
                        }
        
                        return true; // If all checks pass
                      },
                    }
                  }}
                  render  = { ({ 
                      field     : { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <TextField
                        fullWidth 
                        helperText = {error ? error.message : "File Type: JPG/JPEG/PNG (Max 1MB)"}
                        size       = "medium"
                        error      = {!!error}
                        type       = 'string'
                        value      = {value?.name || ''}
                        label      = {"File"}
                        variant    = "outlined"
                        sx         = {{
                          my:2
                        }}
                        InputProps = {{
                          readOnly    : true,
                          endAdornment: (
                          <>
                            <IconButton
                              component = "label"
                              color     = 'error'
                              disabled = {!isImageValid}
                              onClick   = {handleDeleteImageOrg}
                            >
                              <Delete />
                            </IconButton>
                            <IconButton 
                              component="label"
                              disabled={isImageValid}
                            >
                              <FileUploadOutlined />
                              <input
                                hidden
                                // value    = {value}
                                style    = {{display:"none"}}
                                type     = "file"
                                onChange = {e => onFileChange(onChange, e)}
                                name     = "File Upload"
                                accept   = 'image/*'
                              />
                            </IconButton>
                          </>
                          ),
                        }}
                      />
                    )
                  }
                />
              </Box>
              <Box
                sx={{
                  // width        : '100%',
                  display       : 'flex',
                  flexDirection : 'column',
                  alignItems    : 'center',
                  justifyContent: 'center',
                  // flexGrow       : 1,
                }}
              >
                <Box
                  sx={{
                    border      : 2,
                    borderColor : theme.palette.primary.main,
                    padding     : 2,
                    borderRadius: 2,
                  }}
                >
                  <Image 
                    src    = {''}
                    width  = {0}
                    height = {0}
                    sizes  = "100vw"
                    alt    = "Invoice Image"
                    style  = {{
                      // flexGrow       : 1,
                      minWidth       : 300,
                      maxWidth       : 300,
                      minHeight      : 300,
                      maxHeight      : 300,
                      width          : 'auto',
                      height         : 'auto',
                      backgroundColor: 'black',
                    }}
                  />
                </Box>
                {/* <Controller
                  name    = "file"
                  control = {control}
                  rules   = {{ 
                    // required: {
                    //   value  : true,
                    //   message: "File fields is required"
                    // },
                    validate: {
                      validateFile: (val) => {
                        // If the field is empty, it's valid
                        if (!val) return true;
        
                        // Validate file type
                        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                        if (!validTypes.includes(val.type)) {
                          return 'File type must be JPEG, JPG, or PNG';
                        }
        
                        // Validate file size (max 1MB)
                        const fileSize = val.size;
                        if (fileSize > 1 * 1024 * 1024) {
                          return 'File size must be less than 1MB';
                        }
        
                        return true; // If all checks pass
                      },
                    }
                  }}
                  render  = { ({ 
                      field     : { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                      <TextField
                        fullWidth 
                        helperText = {error ? error.message : "File Type: JPG/JPEG/PNG (Max 1MB)"}
                        size       = "medium"
                        error      = {!!error}
                        type       = 'string'
                        value      = {value?.name || ''}
                        label      = {"File"}
                        variant    = "outlined"
                        sx         = {{
                          my:2
                        }}
                        InputProps = {{
                          readOnly    : true,
                          endAdornment: (
                            <IconButton component="label">
                              <FileUploadOutlined />
                              <input
                                hidden
                                // value    = {value}
                                style    = {{display:"none"}}
                                type     = "file"
                                onChange = {e => onFileChange(onChange, e)}
                                name     = "File Upload"
                                accept   = 'image/*'
                              />
                            </IconButton>
                          ),
                        }}
                      />
                    )
                  }
                /> */}
              </Box>
            </Stack>
            <Box
              sx={{
                width         : '100%',
                display       : 'flex',
                flexDirection : 'row',
                alignItems    : 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                id      = 'button-cancel'
                color   = 'error'
                // onClick = {'#'}
                variant = 'outlined'
                sx      = {{
                  mx:2,
                }}
              >
                Cancel
              </Button>
              <Button
                id      = 'button-submit'
                type    = {'submit'}
                variant = {'contained'}
                color   = {'primary'}
                sx      = {{
                  mx:2,
                }}
              >
                Submit
              </Button>
            </Box>
        </Box>
        </form>
      </Grid>
    </Grid>
  )
}

export default RegisterPage;