import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Admin from "./Admin";
import { getAdminPostAction } from "./AdminAction"
import {  getCommentAction } from "../Main/MainAction"
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
        getAdminPostAction,
        getCommentAction,
        logoutAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
