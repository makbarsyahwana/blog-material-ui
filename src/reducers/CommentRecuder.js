import * as types from "../constant/actionTypes";

var initialState = {
  loading: false,
  result: null,
  error: null,
  message: null,
  otp: null,
  loadResult: true
};

function CommentReducer(state = initialState, action) {
    switch (action.type) {
      case types.GET_COMMENT_REQUEST:
        return Object.assign({}, state, {
          loading: true,
          error: null,
          otp: null,
        });
        break;
      case types.GET_COMMENT_SUCCESS:
        return Object.assign({}, state, {
          loading: false,
          status: true,
          result: action.payload
        });
        break;
      case types.GET_COMMENT_FAILURE:
        return Object.assign({}, state, {
          loading: false,
          status: false,
          error: action.error
        });
        break;
      default:
        return state;
    }
  }
  
  export default CommentReducer;