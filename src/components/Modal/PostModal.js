import React, {useState} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography
} from '@material-ui/core'
import { useNavigate, useLocation } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose()
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const PostModal = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(true);
  console.log(location)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate(-1)
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {location.state.titleName}
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="body"
                label="Body"
                type="text"
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default PostModal
