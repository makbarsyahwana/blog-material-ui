import * as types from "../constant/actionTypes";

var initialState = {
  loading: false,
  result: null,
  error: null,
  message: null,
  otp: null,
};

function AuthReducer(state = initialState, action) {
    switch (action.type) {
      case types.ACTION_REQUEST:
        return Object.assign({}, state, {
          loading: true,
          error: null,
          otp: null,
        });
        break;
      case types.LOGIN_SUCCESS:
        return Object.assign({}, state, {
          loading: false,
          status: true,
          result: action.payload
        });
        break;
      case types.LOGIN_FAILURE:
        return Object.assign({}, state, {
          loading: false,
          status: false,
          error: action.error
        });
        break;
      case types.LOGOUT:
        return Object.assign({}, state, initialState);
        break;
      default:
        return state;
    }
  }
  
  export default AuthReducer;