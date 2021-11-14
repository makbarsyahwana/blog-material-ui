import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReadPostModal from "../../components/Modal/ReadPostModal";
import { 
    getPostAction,
    getCommentAction
} from "./MainAction"

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.Comment
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
       
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadPostModal);
