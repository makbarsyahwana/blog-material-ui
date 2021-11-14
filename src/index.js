import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import store from "./store";
import axios from "axios";
import * as Constant from "./constant/general";
// import ScrollToTop from "./utility/ScrollToTop";


// container
import LoginContainer from "./modules/Auth/LoginContainer";
import AdminContainer from "./modules/Admin/AdminContainer";
import MainContainer from "./modules/Main/MainContainer";
import PostModal from "./components/Modal/PostModal"
import ReadPostModalMain from './modules/Main/MainPostModalContainer';
import ReadPostModalAdmin from './modules/Admin/AdminPostModalContainer'

// action
import { accountLoggedIn } from "./modules/Auth/AuthAction";
import { Create } from "@material-ui/icons";

// axios
axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(
  async (config) => {
    var loginSession = localStorage.getItem(
      "loginCredential"
    );
    if (loginSession) {
      loginSession = JSON.parse(loginSession);
      config.headers.Authorization = loginSession.token;
    }

    let newConfig = {
      ...config,
      headers: {
        ...config.headers,
        Platform: "Web",
        AppVersion: 1,
      },
    };

    return newConfig;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

function PrivateRoute({ children, ...rest }) {
  console.log(accountLoggedIn())
  return accountLoggedIn() ? <Outlet /> : <Navigate to={Constant.Login} />;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Routes>
            <Route path={Constant.Login} element={<LoginContainer />} />
            <Route path={'/'} element={<MainContainer />} /> 
            <Route path={'post/:postId'} element={<ReadPostModalMain />} />
            <Route exact path={Constant.Admin} element={<PrivateRoute/>}>
              <Route path={Constant.Admin} element={<AdminContainer/>} />
              <Route path={'create'} element={<PostModal />} />
              <Route path={'post/:postId/edit'} element={<PostModal />} />
              <Route path={'post/:postId'} element={<ReadPostModalAdmin />} />
            </Route>
          </Routes>
      </Router>
    </Provider>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
