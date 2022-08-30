import React, { useState } from 'react';
import { GrFacebook } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import swal from 'sweetalert';
import axios from 'axios';
import './../Login/Login.scss';
import './Register.scss';

const Register = () => {

    // navigate
    const navigate = useNavigate();

    // get all input data
    const [regInput, setRegInput] = useState({
        name : '',
        email : '',
        username : '',
        password : ''
    });


    // input data change
    const registerHandler = (e) => {
        setRegInput((prev) => ({...prev, [e.target.name] : e.target.value }));
    }


    // data submit 
    const regFormSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            
            // validation
            if(!regInput.name || !regInput.email || !regInput.username || !regInput.password ){
                swal("Danger", "all feild is required", "error");
                // createToast('all feilds are required')
            }else{
                
                await axios.post('http://localhost:5050/api/users/register', regInput)
                .then(res => {
                  
                    setRegInput((prev) => ({
                        name: '',
                        email: '',
                        username: '',
                        password: ''
                    }))
    
                  swal ( "Success" ,  "User has been successfully registered. Please login!" ,  "success" );
        
                  navigate('/login');
                  
                });
        

            }

        } catch (error) {
            
        }

    }

  return (
    <div className="auth-container">



        <div className="login-wrapper shadow-sm">
            <a className='login-logo-link' href="#">
                <img className='login-logo' src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
            </a>
            <span className='reg-text'>Sign up to see photos and videos from your friends.</span>
            <a className='login-with-fb-register' href="#"><GrFacebook /> Login with Facebook </a>

            <div className="divider">
                OR
            </div>
            
            {/* Registraion form */}
            <form onSubmit={regFormSubmitHandler} className='login-form' method='POST'>
                <input name='email' onChange={registerHandler} type="text" className='login-input' placeholder='Phone Number or Email' value={regInput.email}/>
                <input name='name' onChange={registerHandler} type="text" className='login-input' placeholder='First Name' value={regInput.name}/>
                <input name='username' onChange={registerHandler} type="text" className='login-input' placeholder='Username' value={regInput.username}/>
                <input name='password' onChange={registerHandler} type="password" className='login-input' placeholder='Passwrod' value={regInput.password}/>
                <br />

                <p className='reg-form-text'>People who use our service may have uplaoded your contact information to Instagram. <a href="">Learn More</a></p>
                <br />
                <p className='reg-form-text'>By Singing up, You agree to our <a href="">Terms</a>, <a href="">Privacy Policy</a> and <a href="">Cookies Policy</a></p>

                <button type="submit" className='submit-btn'>Register</button>
            </form>


        </div>



        <div className="signup-btn-box">

            <span className='do-not-have-account'>Have an account ? </span> &nbsp;
            <Link to="/login" className='go-signup-page'> Login</Link>
        
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

export default Register;