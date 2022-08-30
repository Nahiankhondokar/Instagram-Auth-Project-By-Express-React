import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import AuthenticateUser from "./middleware/AuthenticateUser";
import AuthRedirectUser from "./middleware/AuthRedirectUser";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import LoadingBar from 'react-top-loading-bar';
import LoaderContext from "./context/LoaderContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Verify from "./components/Verify/Verify";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";


function App() {

  // auth context
  const { dispatch } = useContext(AuthContext);

  // loader context
  const { loaderState, loaderDispatch } = useContext(LoaderContext);

  // get token 
  const token = Cookies.get('token');

  useEffect( () => {

    try {

      axios.get('http://localhost:5050/api/users/me', {
        headers : {
          "Authorization" : `Bearer ${token}` 
        }
      })
      .then(res => {

        // user verify check
        if(res.data.isVerify && token){
          dispatch({ type : "LOGIN_USER_SUCCESSS", payload : res.data });
        }else{
          Cookies.remove('token');
        }

        



      })
      .catch(error => {
        dispatch({ type : "USER_LOGOUT" });
      });
      
    } catch (error) {
      dispatch({ type : "USER_LOGOUT" });
    }

  }, [token]);


  return (
    <>

      <LoadingBar
        color='#f11946'
        progress={loaderState}
        onLoaderFinished={() => loaderDispatch(100)}
      />

      {/* Toaster */}
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
    
    <Routes>
      <Route path="/login" element={ <AuthRedirectUser><Login /></AuthRedirectUser> }/>
      <Route path="/register" element={ <AuthRedirectUser><Register /></AuthRedirectUser> }/>
      <Route path="/:id" element={ <AuthenticateUser><Profile /></AuthenticateUser> }/>
      <Route path="/" element={ <AuthenticateUser><Home /></AuthenticateUser> }/>
      <Route path="/user/:id/verify/:token" element={ <Verify /> }/>
      <Route path="/user/forgot-password" element={ <ForgotPassword /> }/>
    </Routes>
    
    </>
  );
}

export default App;


