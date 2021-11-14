import axios from "axios";
import * as types from "../../constant/actionTypes";



export function loginAction(userId, userEmail) {
    return async dispatch => {
      dispatch({
        type: types.ACTION_REQUEST
      });
      await axios({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/users/"
      }).then(function (response) {
        console.log(response)
        console.log(userId, userEmail)
        if (response.data && response.status === 200) {
            let foundUser = response.data.find(({email, id}) => 
                email === userEmail &&
                String(id) === userId
            )
            console.log(foundUser)
            if (foundUser) {
                savingLoginSession(foundUser);
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: foundUser,
                });
                
            } else {
                alert("your userId or email is invalid")
                dispatch({
                    type: types.LOGIN_FAILURE,
                    error: "your userId or email is invalid"
                  });
            }
        } else {
          let err_msg = "Error while getting user data";
          dispatch({
            type: types.LOGIN_FAILURE,
            error: err_msg
          });
        }
      });
    };
}

function savingLoginSession(loginSession) {
    localStorage.setItem(
        "loginCredential",
        JSON.stringify(loginSession)
    );
}

export function accountLoggedIn() {
    return localStorage.getItem("loginCredential");
}

export function logoutAction() {
    return function (dispatch, state) {
        localStorage.removeItem("loginCredential");
        dispatch({
          type: types.LOGOUT
        });
      };;
}