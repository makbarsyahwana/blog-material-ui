import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
    Modal,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core'
import { useNavigate, useLocation } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const commentStyle = {
    fontSize: '11px'
}

const ReadPostModal = ({ comments }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        navigate(-1)
    };

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                {location.state.title}
                </Typography>
                <br />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {location.state.body}
                </Typography>
                <br />
                <Box sx={commentStyle}>
                    <Typography variant="h6">Comments</Typography>
                    <List style={{maxHeight: 200, overflow: 'auto'}}>
                    {
                        comments?.result?.map((data, idx) => (
                            <ListItem key={idx}>
                                <ListItemText
                                    primary={data.name}
                                    secondary={data.body}
                                />
                            </ListItem>
                        ))
                    }
                    </List>
                </Box>
            </Box>
		</Modal>
	);
};

export default ReadPostModal;