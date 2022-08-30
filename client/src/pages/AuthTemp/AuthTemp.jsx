import React from 'react';
import { GrFacebook } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import mobile from './mobile.png';
import './AuthTemp.scss';
import './../Login/Login.scss';

const AuthTemp = () => {
  return (
    <div className="auth-container">

        <div className="wrapper">
            <div className="wrapper-left">
                <img src={mobile} alt="" />
            </div>

            <div className="wrapper-right">
                <div className="login-wrapper shadow-sm"> 
                    <a className='login-logo-link' href="#">
                        <img className='login-logo' src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
                    </a>

            
                    <form action="" className='login-form'>
                        <input type="text" className='login-input' placeholder='Phone number, username or email'/>
                        <input type="text" className='login-input' placeholder='Passwrod'/>
                        <br />
                        <button type="submit" className='submit-btn'>Log In</button>
                    </form>

                    <div className="divider">
                        OR
                    </div>

                    <a className='login-with-fb' href="#"><GrFacebook /> Login with Facebook</a>
                    <Link to="" className='forgot-password'>Forgot Password ? </Link>
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
            </div>
        </div>

   
    <AuthFooter />
</div>
  )
}

export default AuthTemp;