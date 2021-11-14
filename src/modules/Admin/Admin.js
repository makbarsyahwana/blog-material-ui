import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Fab
} from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import Navbar from '../../components/Navbar'
import { accountLoggedIn } from '../Auth/AuthAction';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom'
import PostModal from '../../components/Modal/PostModal'

const useStyles = makeStyles(theme => ({
  post: {
    fontSize: '18px',
    color: '#000'
  },
  postText: {
    cursor: 'pointer'
  },
}));

const Admin = ({ getAdminPostAction, getCommentAction, post }) => {

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation()
  const [userPost, setUserPost] = useState()

  useEffect(() => {
    let user = JSON.parse(accountLoggedIn())
    getAdminPostAction(user.id)
  }, [])

  const handleEditPost = (id) => {
    navigate(`/admin/post/${id}/edit`, {
      state: {
        background: location,
        modalOpen: true,
        titleName: "Edit Post"
      }
    })
  }

  const handleReadPost = (data) => {
    getCommentAction(data.id).then(() => {
      navigate(`/admin/post/${data.id}`, {
        state: {
          background: location,
          modalOpen: true,
          title: data.title,
          body: data.body,
        }
      })
    })
}

  const handleCreatePost = () => {
    navigate('/admin/create', {
      state: {
        background: location,
        modalOpen: true,
        titleName: "Create Post"
      }
    })
  }

  return (
    <>
      <Navbar pageTitle={'Admin'}/>
      <List>
        {
          post.result?.map((data, idx) => (
              <ListItem className={classes.post} key={idx} key={idx}>
                  <ListItemText
                      className={classes.postText}
                      onClick={() => handleReadPost(data)}
                      primary={data.title}
                      secondary={data.body}
                  />
                  <CreateIcon 
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => handleEditPost(data.id)}
                  />
              </ListItem>
          ))
        }
      </List>
      { post.loading && "loading..." }
      <Fab 
      onClick={handleCreatePost}
      style={{
        right: '50px',
        bottom: '50px',
        marginTop: '10px',
        position: 'fixed',
      }} 
      color="primary" 
      aria-label="add">
        <AddIcon />
      </Fab>
    </>
  );
};

export default Admin;