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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { getLikedPost } from './MainAction';

const useStyles = makeStyles(theme => ({
    post: {
      fontSize: '18px',
      color: '#000'
    },
    postText: {
        cursor: 'pointer'
    }
}));

const Main = ({ getPostAction, getCommentAction, post, comments, logoutAction }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    // create state variables for each input
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState()
    const [body, setBody] = useState()
    const [likedPost, setLikedPost] = useState([])

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

    const handleLike = async (id) => {
        setLikedPost([...likedPost, id])
        localStorage.setItem("likedPost", JSON.stringify([...likedPost, id]))
    }

    const handleUnlike = (id) => {
        let updatedLikedPost = likedPost.filter(postId => postId !== id)
        setLikedPost(updatedLikedPost)
        localStorage.setItem("likedPost", JSON.stringify(updatedLikedPost))
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
        setLikedPost(JSON.parse(getLikedPost()) ? JSON.parse(getLikedPost()) : [])
    }, [])

    console.log(likedPost)
  
  
    return (
        <>
            <Navbar pageTitle={'Homepage'} logoutAction={logoutAction}/>
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
                            {/* {
                                console.log(likedPost?.filter(postId => postId === data.id))
                            } */}
                            {
                                likedPost?.filter(postId => postId === data.id).length > 0 ? (
                                    <FavoriteIcon key={idx}
                                        onClick={() => handleUnlike(data.id)}
                                        style={{
                                            cursor: "pointer",
                                            color: "red"
                                        }}
                                    /> 
                                ) : (
                                    <FavoriteBorderIcon key={idx}
                                        onClick={() => handleLike(data.id)}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    />
                                )
                            }
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