import axios from "axios";
import * as types from "../../constant/actionTypes";

export function getAdminPostAction(userId) {
    return async dispatch => {
      dispatch({
        type: types.GET_ADMIN_POST_REQUEST
      });
      await axios({
        method: "GET",
        url: `https://jsonplaceholder.typicode.com/posts/`
      }).then(function (response) {
        console.log(response)
        if (response.data && response.status === 200) {
            let userPost = response.data.filter((post) => post.userId === userId)
            console.log(userPost)
            dispatch({
                type: types.GET_ADMIN_POST_SUCCESS,
                payload: userPost
            })
        } else {
          let err_msg = "Error while getting the comment data"
          dispatch({
            type: types.GET_ADMIN_POST_FAILURE,
            error: err_msg
          });
        }
      });
    };
}