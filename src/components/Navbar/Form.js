import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

const Form = ({ handleClose }) => {
	const classes = useStyles();

	const onSubmit = data => {
		console.log(data);
	};

	return (
		<ul>
            <li>Admin</li>
            <li>Main</li>
        </ul>
	);
};

export default Form;