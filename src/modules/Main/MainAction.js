import axios from "axios";
import * as types from "../../constant/actionTypes";

export function getPostAction(page) {
    return async dispatch => {
      dispatch({
        type: types.GET_POST_REQUEST
      });
      await axios({
        method: "GET",
        url: `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      }).then(function (response) {
        console.log(response)
        if (response.data && response.status === 200) {
            if (response.data.length > 0) {
                dispatch({
                    type: types.GET_POST_SUCCESS,
                    payload: response.data
                })
            } else {
                dispatch({
                    type: types.STOP_GET_POST,
                    payload: false
                })
            }
        } else {
          let err_msg = "Error while getting the post data"
          dispatch({
            type: types.GET_POST_FAILURE,
            error: err_msg
          });
        }
      });
    };
}

export function getCommentAction(postId) {
    return async dispatch => {
      dispatch({
        type: types.GET_COMMENT_REQUEST
      });
      await axios({
        method: "GET",
        url: `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      }).then(function (response) {
        console.log(response)
        if (response.data && response.status === 200) {
            dispatch({
                type: types.GET_COMMENT_SUCCESS,
                payload: response.data
            })
        } else {
          let err_msg = "Error while getting the comment data"
          dispatch({
            type: types.GET_COMMENT_FAILURE,
            error: err_msg
          });
        }
      });
    };
}

export function getLikedPost() {
    return localStorage.getItem("likedPost");
}