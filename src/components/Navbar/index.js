
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
 } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ModalDialog from './ModalDialog';
import { useNavigate } from 'react-router-dom'

import { 
    accountLoggedIn,
    logoutAction
} from "../../modules/Auth/AuthAction";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ pageTitle }) => {

    const navigate = useNavigate()
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePermission = () => {
        if (accountLoggedIn()) {
            logoutAction()
            navigate('/')
        } else {
            navigate('/login')
        }
    }

    return (
        <AppBar position="static">
        <Toolbar>
            <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={handleOpen}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            {pageTitle}
            </Typography>
            <Button color="inherit" onClick={handlePermission}>
            { accountLoggedIn() ? 'Log Out' : 'Log In' }
            </Button>
        </Toolbar>
        <ModalDialog open={open} handleClose={handleClose} />
        </AppBar>
    );
};

export default Navbar;