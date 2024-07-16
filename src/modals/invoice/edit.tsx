import React from 'react'
import { TextField, Button, Stack, Switch, FormControlLabel, MenuItem, Box, Autocomplete, IconButton, CardMedia} from '@mui/material'
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
import { FileUploadOutlined, Delete } from '@mui/icons-material';
import { axios, http } from '@/services/axios';

export default function InvoiceEdit({modalOnClose, invoice_id, getData}:any) {

  // const [openAddLineModal, setOpenAddLineModal]                      = React.useState(false);
  // const handleOpenAddLineModal                                       = () => setOpenAddLineModal(true);
  // const handleCloseAddLineModal                                      = () => setOpenAddLineModal(false);
  const [partnerOptions, setPartnerOptions]             = React.useState([])
  const [lineInvoice, setLineInvoice]                   = React.useState<any[]>([])
  const [grandTotal, setGrandTotal]                     = React.useState(0);
  const [lineTotal, setLineTotal]                       = React.useState(0);
  const [deleteInvoiceLineID, setDeleteInvoiceLineID]   = React.useState('');
  const [editInvoiceLineID, setEditInvoiceLineID]       = React.useState('');
  const [openDeleteModal, setOpenDeleteModal]           = React.useState(false);
  const [openDeleteImageModal, setOpenDeleteImageModal] = React.useState(false);
  const [openEditModal, setOpenEditModal]               = React.useState(false);
  const [openImageModal, setOpenImageModal]             = React.useState(false);
  const [isImageValid, setIsImageValid]                 = React.useState(false);
  const [imageSrc, setImageSrc]                         = React.useState<any>(null);

  const { refetch: doGetPartner, data: dataPartner, isLoading: isLoadingPartner } = usePartnerGetActive();
  
  const { 
    watch,
    control,
    register,
    reset,
    setValue,
    setError,
    clearErrors,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    discount    : string,
    batchno     : string,
    ispercentage: boolean,
    partner_id  : {} | null,
    pay_date    : string,
    docaction   : {} | null,
    file        : File | null,
    file_name   : string,
    url_file    : string,
    // grand_total : number,
  }>({
    defaultValues: {
      discount    : '0',
      batchno     : '',
      ispercentage: false,
      partner_id  : null,
      pay_date    : '',
      docaction   : null,
      file        : null,
      file_name   : '',
      url_file    : '',
      // grand_total : 0,
    }
  })

  const loadData = async (data: any) => {
    
    reset({
      discount    : data.data.discount,
      batchno     : data.data.batchno,
      ispercentage: data.data.ispercentage,
      partner_id  : data.data.partner ? {value: data.data.partner.id, label: data.data.partner.name}: null,
      pay_date    : dayjs(data.data.pay_date).format('DD-MM-YYYY').toString(),
      docaction   : statusOptions.find( (val) => val.value == data.data.docaction) || null,
      file        : data.data.file[0].File,
      file_name   : data.data.file[0].filename,
      url_file    : data.data.file[0].url_file,
      // grand_total : data.data.grand_total,
    })

    const urlFile = data.data.file[0].url_file;
    if(urlFile != '' || null) {
      const response = await http.get('http://'+urlFile, {
        responseType: 'blob'
      });

      const objectURL = URL.createObjectURL(response.data);
      setImageSrc(objectURL);

      // Create a File object from the Blob
      const filename = urlFile.substring(urlFile.lastIndexOf('-') + 1);
      const fileType = response.data.type;
      const fileData = new File([response.data], filename, { type: fileType });
      setValue('file',fileData)
      setIsImageValid(true);
    }
    else {
      setImageSrc('');
      setIsImageValid(false);
    }

    const rows    = data.data.line.map( (val: any,idx: number) => ({line_id: idx, ...val}) )
    // data.data.line.map((val) => ({

    // }))
    setGrandTotal(data.data.grand_total)
    setLineTotal(data.data.total_line)
    setLineInvoice(rows);
  }
  
  
  
  // const deleteLineInvoice = () => {
  //   setLineInvoice( (prevList) => prevList.filter( (row:any) => row.line_id !== deleteInvoiceLineID))
  // };


  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal  = (invoice_line_id: string) => {
    setDeleteInvoiceLineID(invoice_line_id)
    setOpenDeleteModal(true);
  }

  const handleCloseDeleteImageModal = () => setOpenDeleteImageModal(false);
  const handleOpenDeleteImageModal  = () => {
    setOpenDeleteImageModal(true);
  }

  const handleDeleteImageInvoice = () => {
    setValue('file', null)
    setImageSrc('')
    setIsImageValid(false)
    setOpenDeleteImageModal(false);
  }

  const { mutate: submitDeleteLine, isLoading: isLoadIngDeleteLine } = useInvoiceLineDelete({ modalClose: handleCloseDeleteModal ,updateTable: () => doGetInvoice() });
  
  const handleDeleteInvoiceLine = () => {
    submitDeleteLine({invoice_line_id: deleteInvoiceLineID})
  }


  const handleOpenEditModal  = (invoice_id: string) => {
    setEditInvoiceLineID(invoice_id);
    setOpenEditModal(true);
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditInvoiceLineID('');
  }


  const { mutate: submitEditInvoice, isLoading }                        = useInvoiceEdit({closeModal: ()=>modalOnClose(), invoice_id: invoice_id, getData: () => getData()});
  const { refetch: doGetInvoice, data, isLoading: isLoadingGetPartner } = useInvoiceGetOne(invoice_id, (dataOriginal: any)=>loadData(dataOriginal));

  const [lineColumn, setLineColumn]  = React.useState([
      { field: 'id', headerName: 'ID', type : 'string', flex : 0.3, filterble: false },
      { field: 'no', headerName: 'No', type: 'number', width: 10, filterble : false, sortable: false,
        renderCell: (params: any) => params.api.getAllRowIds().indexOf(params.id)+1
      },
      { field: 'product_id', headerName: 'Product', type : 'string', minWidth: 250, filterble: false,
        valueGetter: (params: GridRenderCellParams) => params.row.product.id 
      },
      { field: 'product', headerName: 'Product', type : 'string', minWidth: 250, filterble: false,
        valueGetter: (params: GridRenderCellParams) => params.row.product.name 
      },
      { field: 'invoice', headerName: 'Invoice ID', type : 'string', minWidth: 250, filterble: false,
        valueGetter: (params: GridRenderCellParams) => params.row.invoice.id 
      },
      { field: 'qty', headerName: 'Qty', type : 'string', minWidth: 100, filterble: false },
      { field: 'price', headerName: 'Price', type : 'string', minWidth: 100, filterble: false },
      { field: 'amount', headerName: 'Amount', type : 'string', minWidth: 100, filterble: false },
      { field: 'total', headerName: 'Total', type : 'string', minWidth: 150, filterble: false },
      { field: 'action', type: 'actions', width:50, getActions: (params: any) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          key     = {"edit-"+params.id}
          icon    = {<EditIcon />}
          label   = "Edit"
          onClick = {() => handleOpenEditModal(params.row.id)}
          showInMenu
        />,
        <GridActionsCellItem
          key     = {"delete-"+params.id}
          icon    = {<DeleteIcon />}
          label   = "Delete"
          onClick = {() => handleOpenDeleteModal(params.row.id)}
          showInMenu
        />,
      ]},
    ],
  );

  const getDataPartner = () => {
    doGetPartner().then(
      (resp: any) => {
        if(resp.status == 'error') {
        }
        else {
          const rows    = resp.data.data.map( (val: any,idx: number) => ({value: val.id, label: (val.name).toUpperCase()}) )
          setPartnerOptions(rows);
        }
      } 
    )
  }
  

  
  const countGrandTotal = () => {
    // const result = lineInvoice.reduce( (total, line:any) => total + line.total)
    const discount     = parseFloat(getValues('discount') || '0')
    const ispercentage = getValues('ispercentage')

    let total = 0;
    lineInvoice.forEach((value: any) => {
      // console.log(value.total);
      total = total + value.amount
    })
    
    if(ispercentage == true){
      total = total - ( (discount/100)*total );
    }
    else{
      total = total - discount;
    }

    setGrandTotal(total)
  }

  const onSubmit: SubmitHandler<{}> = (data: any) => {

    const createObj = {
      batchno     : data.batchno,
      discount    : data.discount,
      ispercentage: data.ispercentage,
      partner_id  : data.partner_id.value,
      docaction   : data.docaction.value,
      file        : data.file,
    }
    submitEditInvoice(createObj)
  }

  const onDiscountChange = (onChange: any, event: any) => {
    const re = /^[0-9]*\.?[0-9]*$/;

    // if value is not blank, then test the regex
    if (event.target.value === '' || re.test(event.target.value)) {
      if(getValues('ispercentage') == true){
        if(event.target.value >= 100) {
          onChange(event)
          setValue('discount', '100')
        } 
        else{
          // setValue('discount', event.target.value)
          onChange(event)
        }
      }
      else{
        // setValue('discount', event.target.value)
        onChange(event)
      }
      countGrandTotal()
    }
  }

  const onPercentageChange = (onChange: any, event:any) => {
    if(event.target.checked == true){
      if( parseInt(getValues('discount') || '0') >= 100){
        
        setValue('discount', '100')
      }
    }
    onChange(event)
    countGrandTotal()
    // setValue('ispercentage', event.target.checked);
  }

  
  const onFileChange = (onChange: any, event:any) => {
    clearErrors('file');
    const fileValue = event.target.files[0];
    const fileName  = fileValue?.name;
    const fileSize  = fileValue?.size;
    const fileType  = fileValue?.type;
  
    if (event.target.files.length != 0) {
      if (['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)){
        
        if (fileSize < 1048576) {
          onChange(fileValue)
          const objectURL = URL.createObjectURL(fileValue);
          setImageSrc(objectURL);
          setIsImageValid(true);
          // setValue('file_name',fileName);
        }
        else {
          setError('file', { type:'validate', message: "File size more than 1MB"});
          setValue('file', null)
          setImageSrc('')
          setIsImageValid(false)
        }
      }
      else {
        setError('file', { type:'validate', message: "Invalid file type"});
        setValue('file', null)
        setImageSrc('')
        setIsImageValid(false)
      }
    }
    else {
      setValue('file', null)
      setImageSrc('')
      setIsImageValid(false)
    }
  }

  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  }

  React.useEffect( () => {
    countGrandTotal();
  }, [lineInvoice])

  React.useEffect(() => {
    getDataPartner();
    doGetInvoice();
  },[])

  const statusOptions = [
    { value: "DR", label: "Draft" },
    { value: "IP", label: "In Progress" },
    { value: "CO", label: "Complete" },
    { value: "VO", label: "Void" },
  ];
  
  const FooterGrandTotal = () => {

    // console.log(grandTotal)
    const grandTotalRupiah = new Intl.NumberFormat('id-ID', {
      style   : 'currency',
      currency: 'IDR',
    }).format(grandTotal);

    const lineTotalRupiah = new Intl.NumberFormat('id-ID', {
      style   : 'currency',
      currency: 'IDR',
    }).format(lineTotal);

    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        <table>
          <tbody>
            <tr>
              <td>
                Line Total
              </td>
              <td>
                :
              </td>
              <td>
                {lineTotalRupiah}
              </td>
            </tr>
            <tr>
              <td>
                Grand Total
              </td>
              <td>
                :
              </td>
              <td>
                {grandTotalRupiah}
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    );
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>  
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"row"} gap={2}>
            <Stack direction={'column'} width="30%">
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
                    id                   = "select-partner"
                    options              = {partnerOptions}
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
                  //   label      = {"Partner"}
                  //   variant    = "outlined"
                  //   sx         = {{mb:2}}
                  //   select
                  //   fullWidth
                  // >
                  //   {
                  //     partnerOptions.map((option: {label: string, value: string}) => (
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
                    label      = {"No Batch"}
                    variant    = "outlined"
                    sx         = {{mb:2}}
                    fullWidth
                  />
                  )
                }
              />

              <Controller
                name    = "pay_date"
                control = {control}
                rules   = {{ required: {
                  value  : true,
                  message: "Pay Date fields is required"
                }}}
                render  = { ({ 
                    field     : { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <DatePicker
                      label     = {"Pay Date"}
                      value     = {dayjs(value,'DD-MM-YYYY')}
                      format    = 'DD-MM-YYYY'
                      onChange  = {onChange}
                      disabled   = {true}
                      sx        = {{mb:2}}
                      slotProps = {{
                        textField: {
                          error     : !!error,
                          helperText: error ? error.message: null,
                        },
                      }}
                    />
                  // <TextField
                  //   // helperText = {error ? error.message : null}
                  //   size       = "medium"
                  //   error      = {!!error}
                  //   onChange   = {onChange}
                  //   type       = 'string'
                  //   value      = {value}
                  //   label      = {"Pay Date"}
                  //   variant    = "outlined"
                  //   sx         = {{mb:2}}
                  //   fullWidth
                  // />
                  )
                }
              />

              <Controller
                name    = "docaction"
                control = {control}
                rules   = {{ required: {
                  value  : true,
                  message: "Status fields is required"
                }}}
                render  = { ({ 
                    field     : { onChange, value },
                    fieldState: { error },
                    formState,
                  }) => (
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id                   = "select-status"
                      options              = {statusOptions}
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
                  // <TextField
                  //   // helperText = {error ? error.message : null}
                  //   size       = "medium"
                  //   error      = {!!error}
                  //   onChange   = {onChange}
                  //   type       = 'string'
                  //   value      = {value}
                  //   label      = {"Pay Date"}
                  //   variant    = "outlined"
                  //   sx         = {{mb:2}}
                  //   fullWidth
                  // />
                  )
                }
              />
              
              <Stack 
                // direction = {"row"}
                // gap       = {2}
                sx={{
                  '@media (min-width: 0px)'  : {
                    flexDirection : 'column',
                    justifyContent: 'center',
                    gap           : 0,
                    marginBottom  : 2,
                  },
                  '@media (min-width: 1024px)': {
                    flexDirection : 'row',
                    justifyContent: 'center',
                    gap           : 0,
                    marginBottom  : 0,
                    // divider      : (<Divider orientation="vertical" flexItem />)
                  },
                }}
              >
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
                      onChange   = {e => onDiscountChange(onChange, e)}
                      type       = 'string'
                      value      = {value}
                      label      = {"Discount"}
                      variant    = "outlined"
                      sx         = {{mb:2}}
                      // inputProps={{
                      //   // max      : '100',
                      //   maxLength: '3'
                      // }}
                      fullWidth
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
                            display       : "flex",
                            flexDirection : "row",
                            justifyContent: 'center',
                            margin        : 0,
                            mb            : 2,
                            width         : '100%'
                          }}
                        />
                    )
                  }
                />
              </Stack>
              
              <Controller
                name    = "file"
                control = {control}
                rules   = {{ 
                  // required: {
                  //   value  : true,
                  //   message: "File fields is required"
                  // },
                  validate: {
                    fileType: (val: any) => ['image/jpeg', 'image/png', 'image/jpg'].includes(val.type) || 'Invalid file type',
                    fileSize: (val: any) => val.size < 1048576 || 'File size more than 1MB',
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
                    // onChange   = {e => onDiscountChange(onChange, e)}
                    type       = 'string'
                    value      = {value?.name || ''}
                    label      = {"File"}
                    variant    = "outlined"
                    sx         = {{mb:2}}
                    InputProps = {{
                      readOnly    : true,
                      endAdornment: (
                        <>
                          <IconButton 
                            component = "label"
                            color     = 'error'
                            disabled = {!isImageValid}
                            onClick   = {handleOpenDeleteImageModal}
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
                    // inputProps={{
                    //   // max      : '100',
                    //   maxLength: '3'
                    // }}
                  />
                  )
                }
              />
              
              <Box
                marginBottom  = {2}
              >
                <Button
                  fullWidth
                  disabled = {!isImageValid}
                  variant  = {'contained'}
                  color    = {'secondary'}
                  onClick  = {handleOpenImageModal}
                >
                  Show File
                </Button>
              </Box>

              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Submit
              </Button>
            </Stack>
            <Stack direction={'column'} width="70%">
              <div style={{
                width  : '100%',
                height : 450,
                // display: 'grid',
              }}>
                <DataGrid 
                  getRowId              = { (row: any) => row.id }
                  sx                    = {{ overflowX: 'scroll' }}
                  rows                  = {lineInvoice}
                  columns               = {lineColumn}
                  scrollbarSize         = {5}
                  disableColumnMenu     = {true}
                  columnVisibilityModel = {{ id: false, invoice: false, product_id: false }}
                  hideFooterPagination  = {true}
                  slots                 = {{
                    footer: FooterGrandTotal,
                  }}
                />
              </div>
            </Stack>

          </Stack>
        </form>
      </LocalizationProvider>

      <ModalComponent
        modalOpen    = {openEditModal}
        modalOnClose = {handleCloseEditModal}
        modalSize    = 'sm'
        modalTitle   = 'Edit Invoice Line'
      >
        <InvoiceEditLine modalOnClose={handleCloseEditModal} invoice_line_id={editInvoiceLineID} getData={doGetInvoice}/>
        {/* <PartnerEdit modalOnClose={handleCloseEditModal} partner_id={editPartnerID} getData={getDataPartner}/> */}
      </ModalComponent>

      <ModalConfirmComponent
        modalId      = 'invoice-line-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onSubmit     = {handleDeleteInvoiceLine} 
        modalTitle   = {"Delete Confirmation"}
        modalText    = {"Do you want to delete this record?"}
        buttonText   = {"Delete"}
        buttonColor  = {"error"}
      />

      <ModalConfirmComponent
        modalId      = 'invoice-image-delete'
        modalOpen    = {openDeleteImageModal}
        modalOnClose = {handleCloseDeleteImageModal}
        onSubmit     = {handleDeleteImageInvoice}
        modalTitle   = {"Delete Confirmation"}
        modalText    = {"Do you want to delete this image?"}
        buttonText   = {"Delete"}
        buttonColor  = {"error"}
      />

      <ModalComponent
        modalOpen    = {openImageModal}
        modalOnClose = {handleCloseImageModal}
        modalSize    = 'sm'
        modalTitle   = 'Invoice Image'
      >
        <CardMedia
          component = "img"
          height    = "auto"
          image     = {imageSrc}
          alt       = "Invoice Image"
        />
      </ModalComponent>
    </>
  )
}
