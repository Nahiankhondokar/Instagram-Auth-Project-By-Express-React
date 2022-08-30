import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { GrFacebook } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import cookie from 'js-cookie';
import AuthContext from '../../context/AuthContext';
import LoaderContext from '../../context/LoaderContext';
import { createErrorToast } from '../../utility/toast';
import './Login.scss';


const Login = () => {


    // auth context 
    const {dispatch} = useContext(AuthContext)

    // loader context 
    const {loaderDispatch} = useContext(LoaderContext)

    // navigate
    const navigate = useNavigate();



        
    // loign data
    const [loginData, setLoginData] = useState({
        auth : '',
        password  : ''
    });


    // user login handler
    const userLoginHandler = (e) => {
        e.preventDefault();

        setLoginData((prev) => ({
            ...loginData, [e.target.name] : e.target.value
        }));


    }


    // login form sumbit 
    const loginFromSubmitHandler = async (e) => {
        e.preventDefault();

        try {

            // validatin
            if(!loginData.auth || !loginData.password){
                createErrorToast('All Fields are required')
            }else{

                await axios.post('http://localhost:5050/api/users/login', {
                    auth : loginData.auth,
                    password : loginData.password
                })
                .then(res => {

                   if(res.data.user.isVerify){

                    cookie.set("token", res.data.token);
                    dispatch({ type : 'LOGIN_USER_SUCCESSS', payload : res.data.user});
                    navigate('/');
                    loaderDispatch({ type : 'LOADER_START'});

                   }else {
                    createErrorToast('Verify your account')
                   }

                    // console.log(res.data);
                });

            }
    
        } catch (error) {
            createErrorToast('Invalid Eamil or Password');
        }


    }

  return (
    <div className="auth-container">

        <div className="login-wrapper shadow-sm"> 
            <a className='login-logo-link' href="#">
                <img className='login-logo' src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
            </a>

              
            <form onSubmit={ loginFromSubmitHandler } className='login-form'>
                <input onChange={ userLoginHandler } value={loginData.auth} name="auth" type="text" className='login-input' placeholder='Email or Username'/>
                <input onChange={ userLoginHandler } value={loginData.password} name="password" type="passwrod" className='login-input' placeholder='Passwrod'/>
                <br />
                <button type="submit" className='submit-btn'>Log In</button>
            </form>

            <div className="divider">
                OR
            </div>

            <a href="#" className='login-with-fb'><GrFacebook /> Login with Facebook</a>
            <Link to="/user/forgot-password" className='forgot-password'>Forgot Password ? </Link>
        </div>



        <div className="signup-btn-box">

            <span className='do-not-have-account'>Don't have an account ? </span> &nbsp;
            <Link to="/register" className='go-signup-page'> Sign up</Link>
           
        </div>

        <div className="get-app">
            <span className='app-text'>Get the app.</span>
           <div className="app-logo">
                <img className='app-img' src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="" />
                <img className='app-img'  src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="" />
           </div>
        </div>

       
        <AuthFooter />
    </div>
  )
}

export default Login;