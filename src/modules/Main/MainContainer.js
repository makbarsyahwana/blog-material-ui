import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Main from "./Main";
import { 
    getPostAction,
    getCommentAction
} from "./MainAction"
import { logoutAction } from "../Auth/AuthAction"

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.Post,
    comments: state.Comment
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
        getPostAction,
        getCommentAction,
        logoutAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
