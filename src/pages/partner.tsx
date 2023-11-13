import React, { useEffect } from 'react'
import moment from 'moment'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import AppLayout from '@/layout/AppLayout'
import { Box, Container, Paper, Toolbar, Typography, Grid, Stack} from '@mui/material'
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import TableComponent from '@/components/table.component'
import MenuListComponent from '@/components/menuList.component'
import { AlertError, AlertInfo, AlertSuccess, AlertWarning } from '@/utils/notification'
import ModalComponent from '@/components/modal.component'
import PartnerCreate from '@/modals/partner/create'
import { usePartnerGet } from '@/hooks/partner/use-get'
import usePartnerDelete from '@/hooks/partner/use-delete'
import PartnerEdit from '@/modals/partner/edit'



const inter = Inter({ subsets: ['latin'] })

const test = () => {
  AlertInfo("Hello");
  AlertWarning("Hello");
  AlertError("Hello");
  AlertSuccess("Hello");
}

export default function Partner() {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [openEditModal, setOpenEditModal]     = React.useState(false);
  const [loadingData, setLoadingData]         = React.useState(false);
  const [editPartnerID, setEditPartnerID]     = React.useState('');
  const [rowData, setRowData]                 = React.useState<any[]>([]);
  const [queryOptions, setQueryOptions]       = React.useState({field: 'id', sort: 'asc'});
  const [rows, setRows]                       = React.useState([]);
  
  const { refetch: doGetPartner, data, isLoading: isLoadingPartner } = usePartnerGet(queryOptions);
  const handleOpenCreateModal                                        = () => setOpenCreateModal(true);
  const handleCloseCreateModal                                       = () => setOpenCreateModal(false);
  const handleQuery                                                  = (data: any) => {
    console.log("iniya");
    console.log(data);
    const sortData = data.sortModel[0];
    setQueryOptions(sortData)
  }
  const handleOpenEditModal                                          = (partner_id: string) => {
    setOpenEditModal(true);
    setEditPartnerID(partner_id);
  }
  const handleCloseEditModal                                         = () => {
    setOpenEditModal(false);
    setEditPartnerID('');
  }
  const getDataPartner                                               = () => {
    console.log("get data partner");
    doGetPartner().then(
      (resp: any) => {
        console.log("set data partner");
        setRowData(resp.data);
      } 
    )
  }
  const { mutate: submitDelete, isLoading: isLoadIngDelete }         = usePartnerDelete({getData: () => getDataPartner()});
  
  
  const [headerData, setHeaderData]               = React.useState([
    
    { field     : 'id',
      headerName: 'No',
      type      : 'number',
      // minWidth  : 100,
      flex      : 0.3,
      filterble : false,
      renderCell: (index:GridRenderCellParams) => index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
    },
    { field: 'name', headerName: 'Name', type: 'string', minWidth:100, flex: 0.75},
    { field: 'bpcode', headerName: 'BP Code', type: 'string', minWidth:100, flex: 0.5},
    { field: 'dn_amount', headerName: 'DN Amount', type: 'number', minWidth:100, flex: 0.25},
    { field: 'cn_amount', headerName: 'CN Amount', type: 'number', minWidth:100, flex: 0.25},
    { field: 'isactive', headerName: 'Is Active', type: 'boolean', minWidth:100, flex: 0.5},
    { field     : 'created_at',
      headerName: 'Created At',
      type      : 'string',
      minWidth  : 100,
      flex      : 1,
      renderCell: (params:GridRenderCellParams) => moment(params.value).format("DD-MM-YYYY HH:mm:ss"),
    },
    { field: 'action', type: 'actions', width:100, getActions: (params: GridRenderCellParams) => [
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
        onClick = {() => {submitDelete({partner_id: params.row.id})}}
        showInMenu
      />,
      
      // <GridActionsCellItem
      //   icon={<SecurityIcon />}
      //   label="Toggle Admin"
      //   onClick={toggleAdmin(params.id)}
      //   showInMenu
      // />,
      // <GridActionsCellItem
      //   icon={<FileCopyIcon />}
      //   label="Duplicate User"
      //   onClick={duplicateUser(params.id)}
      //   showInMenu
      // />,
    ]},
  ]);
    
  const menuList: {handleClick: ()=>void, title: string}[] = [{
    handleClick: handleOpenCreateModal,
    title      : 'Create Partner',
  },{
    handleClick: test,
    title      : 'Test',
  }]

  useEffect(() => {
    // console.log(isLoadingPartner)
    if (isLoadingPartner) {
      setLoadingData(true) 
    } else {
      setLoadingData(false)
    }
  }, [isLoadingPartner]);

  useEffect( () => {
    getDataPartner()
  },[])

  return (
    <AppLayout title={"Partner"}>
      {/* <Container
        maxWidth       = {false}
        disableGutters = {true}
      >
        <Paper
          sx={{
            p            : 2,
            display      : 'flex',
            flexDirection: 'column',
            height       : 240,
          }}
        >
          <Typography variant="h4" color="initial" fontWeight={700} height={30} lineHeight={1.5} fontSize={'1.25rem'}>User</Typography>
        </Paper>
      </Container> */}

      {/* <Container disableGutters sx={{mr:0, ml:0, display: 'initial'}}> */}
        <Paper 
          sx={{
            p            : 2,
            display      : 'flex',
            flexDirection: 'column',
            // height       : 240,
          }}
        >
        <Box mb={3}>
          <Stack direction={"row"} display={"flex"} alignItems={"center"}>
            <Box flexGrow={1}>
              <Typography variant="h4" color="initial" fontWeight={700} height={30} lineHeight={1.5} fontSize={'1.25rem'}>Partner</Typography>
              <Typography variant="body1" color="initial" height={20} lineHeight={1} fontSize={'1 rem'}>{'Dashboard > Partner'}</Typography>
            </Box>
            <Box>
              <MenuListComponent 
                buttonTitle = 'Action'
                menuArray   = {menuList}
                buttonId    = 'partner-action'
                modalId     = 'partner-modal'
                />
            </Box>
          </Stack>
        </Box>
        
        <TableComponent
          rowData     = {rowData}
          columnData  = {headerData}
          handleQuery = {handleQuery}
          loading     = {isLoadingPartner}
        />
        </Paper>
        <ModalComponent
          modalOpen    = {openCreateModal}
          modalOnClose = {handleCloseCreateModal}
          modalSize    = 'sm'
          modalTitle   = 'Create Partner'
        >
          <PartnerCreate modalOnClose={handleCloseCreateModal}/>
        </ModalComponent>
        <ModalComponent
          modalOpen    = {openEditModal}
          modalOnClose = {handleCloseEditModal}
          modalSize    = 'sm'
          modalTitle   = 'Edit Partner'
        >
          <PartnerEdit modalOnClose={handleCloseEditModal} partner_id={editPartnerID} getData={getDataPartner}/>
        </ModalComponent>
      {/* </Container> */}
    </AppLayout>
  )
}
