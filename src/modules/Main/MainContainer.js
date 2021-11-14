import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Main from "./Main";
import { 
    getPostAction,
    getCommentAction
} from "./MainAction"

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
        getCommentAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
