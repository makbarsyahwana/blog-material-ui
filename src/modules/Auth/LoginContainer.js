import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Login from "./Login";
import { loginAction } from "./AuthAction";

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.Auth,
    // user: state.User.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
        loginAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
