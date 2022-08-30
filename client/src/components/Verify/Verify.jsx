import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsLock } from "react-icons/bs";
import { useState } from 'react';
import AuthFooter from '../AuthFooter/AuthFooter';
import { createErrorToast, createSuccessToast } from '../../utility/toast';
import { useEffect } from 'react';
import './Verify.scss';
import './../../pages/Login/Login.scss';

const Verify = () => {
 
  // params 
  const { id, token } = useParams();

  // console.log(id);
  // console.log(token);

  // navigaet
  const navigate = useNavigate();
 
  // ramdom number state
  const [random, setRandom] = useState('');

  // verify form submit
  const handleVerifyFom = (e) => {
    e.preventDefault();

    if( !random ){
      createErrorToast('Feild is required')
    }

    axios.post('http://localhost:5050/api/users/verify', {random, id, token})
    .then(res => {
        
      createSuccessToast('Account verified Successfully');
      navigate('/login')

    })
    .catch(error => {
      createErrorToast('Account Verified Failed')
      
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
            <h3 className='verify-title'>Reset Password</h3>
            <span className='verify-desc'>Enter your <b>secret key</b> what we have sent you to your email account</span>
          </div>
            
          <form onSubmit={ handleVerifyFom } className='login-form'>
              <input onChange={ e => setRandom(e.target.value)} value={ random } name="random" type="number" className='login-input' placeholder='Secret Number'/>
              <br />
              <button type="submit" className='submit-btn'>Account Verify</button>
          </form>

          <div className="divider">
              OR
          </div>
          
          <Link to="" className='verify-terms'> Create New Account</Link>
      </div>



      <div className="signup-btn-box">

          <Link to="/register" className='go-signup-page'> Back To Register</Link>
        
      </div>


      
    </div>

    <div className="spacer">
      <div className="blankDiv"></div>
      <AuthFooter />
    </div>

    </>

  )
}

export default Verify;