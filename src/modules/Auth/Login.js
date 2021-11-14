import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    TextField,
    Button
} from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { accountLoggedIn } from './AuthAction'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const Login = ({ handleClose, loginAction, auth }) => {
  const classes = useStyles();
  const navigate = useNavigate()
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(userId, email);
    loginAction(userId, email);
  };
  console.log(auth)
  {auth.status && navigate('/admin')}

  return (
    <>
        {/* {auth.error && alert(auth.error)} */}
        <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
            label="User Id"
            variant="filled"
            required
            value={userId}
            onChange={e => setUserId(e.target.value)}
        />
        <TextField
            label="Email"
            variant="filled"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <div>
            <Button variant="contained" onClick={handleClose}>
            Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
            Login
            </Button>
        </div>
        </form>
    </>
  );
};

export default Login;