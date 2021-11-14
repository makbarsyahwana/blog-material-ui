import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'
import {
    List,
    ListItem,
    ListItemText,
    makeStyles
} from '@material-ui/core'
import PostModal from '../../components/Modal/ReadPostModal'
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    post: {
      fontSize: '18px',
      color: '#000'
    },
    postText: {
        cursor: 'pointer'
    }
}));

const Main = ({ getPostAction, getCommentAction, post, comments }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    // create state variables for each input
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReadPost = (data) => {
        getCommentAction(data.id).then(() => {
            navigate(`/post/${data.id}`, {
                state: {
                    background: location,
                    modalOpen: true,
                    title: data.title,
                    body: data.body,
                }
                })     
        })
    }

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            if (post.loadResult) {
                let newPage = page + 1
                getPostAction(newPage);
                setPage(newPage)
            }
        }
    }

    useEffect(() => {
        getPostAction(page)
    }, [])
  
  
    return (
        <>
            <Navbar pageTitle={'Homepage'}/>
            <List>
                {
                    post.result?.map((data, idx) => (
                        <ListItem className={classes.post} key={idx}>
                            <ListItemText 
                                className={classes.postText} 
                                onClick={() => { handleReadPost(data) }}
                                primary={data.title}
                                secondary={data.body}
                            />
                        </ListItem>
                    ))
                }
                {
                    post.loading && "loading..."
                }
            </List>
            {/* <PostModal title={title} body={body} comments={comments} open={open} handleClose={handleClose}/> */}
        </>
    );
};
  
export default Main;