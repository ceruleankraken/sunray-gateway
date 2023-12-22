import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, IconButton, DialogProps } from '@mui/material';

const style = {
  position : 'absolute' as 'absolute',
  top      : '50%',
  left     : '50%',
  transform: 'translate(-50%, -50%)',
  width    : '90%',
  bgcolor  : 'background.paper',
  // border   : '2px solid #000',
  boxShadow  : 24,
  p          : 4,
};

const ModalComponent = ({modalOpen, modalOnClose, modalId, modalBody, modalTitle, modalSize,  children, isTemporary }: any) => {

  const handleClose: DialogProps["onClose"] = (event, reason) => {

    if (reason && reason === "backdropClick")
        return;
    modalOnClose();
}

  return (

      <Dialog
        open             = {modalOpen}
        onClose          = {isTemporary ? modalOnClose : handleClose}
        fullWidth        = {true}
        maxWidth         = {modalSize}
        aria-labelledby  = {modalId}
        aria-describedby = "alert-dialog-description"
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
            color   : (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers id={modalBody}>
          {/* <DialogContentText id={modalBody}> */}
            {children}
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={modalOnClose}>Disagree</Button>
          <Button onClick={modalOnClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>

      // <Modal
      //   closeAfterTransition
      //   open             = {modalOpen}
      //   onClose          = {modalOnClose}
      //   aria-labelledby  = "modal-modal-title"
      //   aria-describedby = "modal-modal-description"
      //   slots            = {{ backdrop: Backdrop }}
      //   slotProps        = {{
      //     backdrop: {
      //       timeout: 500,
      //     },
      //   }}
      // >
      //   <Fade in={modalOpen}>
      //     <Box sx={style}>
      //       <Typography id="modal-modal-title" variant="h6" component="h2">
      //         Text in a modal
      //       </Typography>
      //       <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      //         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      //       </Typography>
      //     </Box>
      //   </Fade>
      // </Modal>
  )
}

export default ModalComponent;