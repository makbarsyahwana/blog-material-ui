import * as types from "../constant/actionTypes";

var initialState = {
  loading: false,
  result: [],
  error: null,
  message: null,
  otp: null,
  loadResult: true
};

function PostReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_ADMIN_POST_REQUEST:
        case types.GET_POST_REQUEST:
            return Object.assign({}, state, {
            loading: true,
            error: null,
            otp: null,
            });
            break;
        case types.STOP_GET_POST:
            return Object.assign({}, state, {
                loadResult: false,
                loading: false
            });
            break;
        case types.GET_POST_SUCCESS:
            return Object.assign({}, state, {
            loading: false,
            status: true,
            result: [...state.result, ...action.payload]
            });
            break;
        case types.GET_ADMIN_POST_SUCCESS:
            return Object.assign({}, state, {
            loading: false,
            status: true,
            result: action.payload
            });
            break;
        case types.GET_ADMIN_POST_FAILURE:
        case types.GET_POST_FAILURE:
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
  
  export default PostReducer;