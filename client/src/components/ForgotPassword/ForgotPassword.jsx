import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsLock } from "react-icons/bs";
import { useState } from 'react';
import AuthFooter from '../AuthFooter/AuthFooter';
import { createErrorToast, createSuccessToast } from '../../utility/toast';
import './../../components/Verify/Verify.scss';
import './../../pages/Login/Login.scss';

const ForgotPassword = () => {
 
  // params 
//   const { id, token } = useParams();


  // navigaet
  const navigate = useNavigate();
 
  // input data
  const [forgotPass, setForgotPass] = useState({
    user : '',
    new_pass : '',
    con_pass : ''
  });

  console.log(forgotPass);
  // input values update
  const handleInputValues = (e) => {

    setForgotPass((prev) => ({
        ...prev, [e.target.name] : e.target.value
    }));

  }

  // forgot password form submit
  const handleForgotPassForm = (e) => {
    e.preventDefault();

    // validation
    if( forgotPass.user === '' || forgotPass.new_pass === '' || forgotPass.con_pass === '' ){
      createErrorToast('Feild are required')
    }

    if( forgotPass.new_pass !== forgotPass.con_pass ){
       
        createErrorToast('Password does not match')

    }


    // password update request to server
    axios.post('http://localhost:5050/api/users/forgot/password', forgotPass)
    .then(res => {
        
      createSuccessToast('Password Changed Successfully');
      navigate('/login')

    })
    .catch(error => {
      createErrorToast('Invalid Email or Username')
      
    });

  }




  return (
    <>
    <div className='top-bar-container shadow-sm'>
        <div className="top-bar-wrapper">
            <div className="logo">
                <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
            </div>
        </div>
    </div>
    

    <div className="auth-container">

      <div className="login-wrapper shadow-sm"> 
          <a className='login-logo-link' href="#">
              <BsLock />
          </a>

          <div className="verify-details">
            <h3 className='verify-title'>Trouble Logging In?</h3>
            <span className='verify-desc'>Enter your email, phone, or username and we'll send you a link to get back into your account.</span>
          </div>
            
          <form onSubmit={ handleForgotPassForm } className='login-form'>
            <input onChange={ handleInputValues } value={ forgotPass.user } name="user" type="text" className='login-input' placeholder='Email or Username'/>
            <input onChange={ handleInputValues } value={ forgotPass.new_pass } name="new_pass" type="text" className='login-input' placeholder='New Password'/>
            <input onChange={ handleInputValues } value={ forgotPass.con_pass } name="con_pass" type="text" className='login-input' placeholder='Confirm Password'/>
            <br />
            <button type="submit" className='submit-btn'>Submit Password</button>
          </form>

          <div className="divider">
              OR
          </div>
          
          <Link to="/register" className='verify-terms'> Create New Account</Link>
      </div>



      <div className="signup-btn-box">

          <Link to="/Login" className='go-signup-page'> Back To Login</Link>
        
      </div>


      
    </div>

    <div className="spacer">
      <div className="blankDiv"></div>
      <AuthFooter />
    </div>

    </>

  )
}

export default ForgotPassword;