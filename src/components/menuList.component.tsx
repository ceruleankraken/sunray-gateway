import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const MenuListComponent = (props: {
    buttonIcon ?: React.ReactNode,
    buttonTitle : string,
    menuArray   : { handleClick: ()=>void, title      : string }[],
    buttonId    : string,
    modalId     : string,
  }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open                    = Boolean(anchorEl);

  const handleClick             = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose             = () => {
    setAnchorEl(null);
  };

  let menuItem = props.menuArray.map( (val, idx) => (
    <MenuItem key={idx} onClick={val.handleClick}>{val.title}</MenuItem>
  ))

  return (
    <div>
      <Button
        id            = {props.buttonId}
        variant       = 'contained'
        aria-controls = {open ? props.modalId : undefined}
        aria-haspopup = "true"
        aria-expanded = {open ? 'true' : undefined}
        color         = 'secondary'
        onClick       = {handleClick}
        startIcon     = { props.buttonIcon ? props.buttonIcon : <MenuOpenIcon />}
      >
        {props.buttonTitle}
        {/* <MenuOpenIcon/>{props.buttonTitle} */}
      </Button>
      <Menu
        id            = {props.modalId}
        anchorEl      = {anchorEl}
        open          = {open}
        onClick       = {handleClose}
        onClose       = {handleClose}
        MenuListProps = {{
          'aria-labelledby': props.buttonId,
          // role: 'listbox',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical  : 'bottom',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical  : 'top',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            width              : 200,
            overflow           : 'visible',
            filter             : 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt                 : 1.5,
            // '& .MuiAvatar-root': {
            //   width: 32,
            //   height: 32,
            //   ml: -0.5,
            //   mr: 1,
            // },
            '&:before': {
              content  : '""',
              display  : 'block',
              position : 'absolute',
              top      : 0,
              right    : 14,
              width    : 10,
              height   : 10,
              bgcolor  : 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex   : 0,
            },
          },
        }}
      >
        {/* <Paper sx={{ width: 320 }}> */}
          {/* <MenuList dense> */}
            {menuItem}
          {/* </MenuList> */}
        {/* </Paper> */}
        {/* <MenuItem onClick = {handleClose}>Profile</MenuItem>
        <MenuItem onClick = {handleClose}>My account</MenuItem>
        <MenuItem onClick = {handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  )
}

export default MenuListComponent;