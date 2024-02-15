import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface ModalConfirmProps {
  modalOpen   : boolean,
  modalOnClose: () => void,
  onSubmit    : () => void,
  modalId     : string,
  modalTitle  : string,
  modalText   : string,
  buttonText  : string,
  buttonColor : "primary" | "secondary" | "success" | "error" | "info" | "warning",
}

const ModalConfirmComponent: React.FC<ModalConfirmProps> = ({
    modalOpen,
    modalOnClose,
    modalId,
    onSubmit,
    modalTitle,
    modalText,
    buttonText,
    buttonColor,
  }) => {

  return (

      <Dialog
        open             = {modalOpen}
        onClose          = {modalOnClose}
        maxWidth         = {'xs'}
        aria-labelledby  = {modalId}
        aria-describedby = {modalId+"-content"}
      >
        <DialogTitle id={modalId}>
          {modalTitle}
        </DialogTitle>
        
        <IconButton
          aria-label = "close"
          onClick    = {modalOnClose}
          sx         = {{
            position: 'absolute',
            right   : 8,
            top     : 8,
            // color   : (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers id={modalId+"-content"}>
          {modalText}
        </DialogContent>

        <DialogActions>
            
            {/* <ButtonComponent
              onClick     = {modalOnClose}
              buttonColor = {'secondary'}
            >
              Cancel
            </ButtonComponent> */}

            <Button 
              id      = 'button-cancel'
              color   = 'primary'
              onClick = {modalOnClose}
              variant = 'outlined'
            >
              Cancel
            </Button>

            <Button
              id      = 'button-delete'
              onClick = {onSubmit}
              color   = {buttonColor}
              variant = 'contained'
              // buttonColor = {'error'}
            >
              {buttonText}
            </Button>


          {/* <Button onClick={modalOnClose}>Disagree</Button>
          <Button onClick={modalOnClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
  )
}

export default ModalConfirmComponent;