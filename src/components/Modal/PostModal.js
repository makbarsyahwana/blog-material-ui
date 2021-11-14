import React, {useState, useEffect} from 'react';
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
import { FormInputError } from '../Error/FormInputError';

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
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleErrMsg, setTitleErrMsg] = useState('')
  const [bodyErrMsg, setBodyErrMsg] = useState('')

  console.log(location)

  useEffect(() => {
    location.state.postTitle && setTitle(location.state.postTitle)
    location.state.postBody && setBody(location.state.postBody)
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate(-1)
  };

  const handleSubmit = () => {
    if (verifyForm()) {
      navigate(-1)
    }
  }

  const verifyForm = () => {
    setTitleErrMsg('')
    setBodyErrMsg('')

    if (
      !title &&
      !body
    ) {
      setTitleErrMsg('title cannot be empty')
      setBodyErrMsg('body cannot be empty')
      return false;
    }
    return true;
  }

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <FormInputError text={titleErrMsg} />
            <TextField
                autoFocus
                margin="dense"
                id="body"
                label="Body"
                type="text"
                fullWidth
                variant="standard"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <FormInputError text={bodyErrMsg} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default PostModal
