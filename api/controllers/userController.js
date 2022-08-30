import User from './../models/User.js';
import bcrypt from 'bcryptjs';
import createError from './errorController.js';
import jwt from 'jsonwebtoken';
import { SendEmail } from '../utility/SendEmail.js';
import { CreateToken } from '../utility/CreateToken.js';
import Token from '../models/Token.js';
import { SendSms } from '../utility/SendSms.js';


/**
 *  @access Public
 *  @route api/User
 *  @method GET
 */
export const getAllUser = async (req, res, next) => {
   
    try {
        const user = await User.find();

        // error show if data can not find.
        if(!user){
            next(createError(404, "user not found"));
        }

        // if data find
        if(user){
            res.status(200).json({user});
        }
        
    } catch (error) {
        
        next(error);

    }

}



/**
 *  @access Public
 *  @route api/User
 *  @method POST
 */
 export const createUser = async (req, res, next) => {

    // get all data
    const { name, email, cell, age, gender, password, username, photo } = req.body;

    // hash password
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash(req.body.password, salt);
    
    try {
        
        await User.create({
            ...req.body, 
            password : hash
        }, { new : true });


        res.status(200).json({
            message : "User Created"
        });

    } catch (error) {
        next(error)
    }

}



/**
 *  @access Public
 *  @route api/User/:id
 *  @method GET
 */
 export const getSingleUser = async (req, res, next) => {

    const { id } = req.params;
    
    try {
        const single = await User.findById(id);

        // error show if data can not find.
        if(!single){
            next(createError(404, "Single Student not found"));
        }

        // if data find
        if(single){
            res.status(200).json({single});
        }

    } catch (error) {

        next(error);

    }

}



/**
 *  @access Public
 *  @route api/User/:id
 *  @method PUT/PATCH
 */
 export const UserUpdate = async (req, res) => {
    
    // get all data
    const { id } = req.params;
    const { name, email, cell, age, gender, password, username, photo } = req.body;

    try {
        const update = await User.findByIdAndUpdate(id, {
           ...req.body 
        }, { new : true});

        res.status(200).json({
            message : "User Updated"
        });
    } catch (error) {
        console.log(error);
    }

}



/**
 *  @access Public
 *  @route api/User/:id
 *  @method DELETE
 */
 export const UserDelete = async (req, res) => {

    // get id
    const { id } = req.params;
    
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            message : "User deleted"
        });
    } catch (error) {
        console.log(error);
    }

}



/**
 *  @access Public
 *  @route api/User/register
 *  @method POST
 */
 export const userRegister = async (req, res, next) => {

    // get all data
    const { email, password } = req.body;

    // hash password
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash(password, salt);
    
    try {
        
        // user data store
        const user = await User.create({
            ...req.body,  
            password : hash
        });

        // token create
        const token = CreateToken({id : user._id}, '1h');

        // secret key generate
        const secretKey = Math.round(Math.random() * 10000000);

        // token update
        await Token.create({ userId : user._id, token : token, secretKey : secretKey });

        // send verify email
        const verify_link = `http://localhost:3000/user/${user._id}/verify/${token}`;

        await SendEmail(user.email, 'Verfiy Account', `${verify_link} Secret key : ${secretKey}`);

        // SendSms();

        res.status(200).json(user);

    } catch (error) {
        next(error)
    }

}


/**
 *  @access Public
 *  @route api/User/login
 *  @method POST
 */
 export const userLogin = async (req, res, next) => {

   // email or username checking
   let login_user = '';
   if(req.body.auth.endsWith('.com')){
        login_user = await User.findOne({ email : req.body.auth});
   }else{
        login_user = await User.findOne({ username : req.body.auth});
   }

   if(!login_user){
    return next(createError(404, "Email or Username is wrong"));
   }

   // check password
   const checkPass = await bcrypt.compare(req.body.password, login_user.password);
   if(!checkPass){
    return next(createError(404, "password is wrong"));
   }

   // crete token
   const token = jwt.sign({ id : login_user._id, isAdmin : login_user.isAdmin }, process.env.JWT_SECRET);


   // skip password or isAdmin's data by distructuring.
   const { password, isAdmin, ...login_info } = login_user._doc;

   res.cookie("access_token", token).status(200).json({
    token : token,
    user : login_info
    
   });


}



/**
 *  @access Public
 *  @route api/User/loggedinuserdata
 *  @method GET
 */
export const getLoggedInUser = async (req, res, next) => {

    try {

        const bearer_token = req.headers.authorization;

        // bearer token check
        if(!bearer_token){
            next(createError(404, 'token not found'));
        }else {

            const token = bearer_token.split(' ')[1];
            
            // token varify
            const token_verify = jwt.verify(token, process.env.JWT_SECRET);

            // error msg
            if(!token_verify){
                next(createError(404, 'invalid token'));
            }

            // login user data
            if(token_verify){

                const user = await User.findById(token_verify.id);

                res.status(200).json(user);
            }
        }
        
        
    } catch (error) {
        next(error)
    }

}


/**
 *  @access Public
 *  @route api/User/userAccountVerify
 *  @method GET
 */
 export const userAccountVerify = async (req, res, next) => {

    try {

        // get data
        const { random, id, token } = req.body;

        // console.log(random);
        // console.log(id);
        // console.log(token);

        // get token
        const verify = await Token.findOne({ userId : id , token : token, secretKey : random });

        // console.log(verify);

        // token verify
        if( !verify ){
            next(createError(404, 'invalid token'));
        }

        if( verify ){
            res.status(200).json({ message : "Account Verified successfully"});
            // update user
            await User.findByIdAndUpdate(id, {
                isVerify : true
            });
            verify.remove();
        }
        
        


        
    } catch (error) {
        next(error)
    }

}



/**
 *  @access Public
 *  @route api/User/userForgotPassword
 *  @method POST
 */
 export const userForgotPassword = async (req, res, next) => {

    try {

        // get data
        const { user, new_pass, con_pass } = req.body;

        // pass verify
        if(new_pass != con_pass){
            next(createError(404, "Password Not Match"));
        }

        // user identify email
        if( user.endsWith('.com') ){
 
            // get email
            const email_verify = await User.findOne({ email : user });

            // email verify 
            if( !email_verify ){
                next(createError(404, "Email does not exists"));
            }

            // password update
            if( new_pass == con_pass && email_verify ){

                // has password
                const salt = await bcrypt.genSalt(10);
                const has_pass = await bcrypt.hash(new_pass, salt);

                // update user
                await User.findOneAndUpdate(email_verify._id, {
                    password : has_pass
                });

                res.status(200).json({ message : "Password Changed successfully"});

            }
    
        }else {
            // get username
            const username_verify = await User.findOne({ username : user });

            // has password
            const salt = await bcrypt.genSalt(10);
            const has_pass = await bcrypt.hash(new_pass, salt);

            // email verify 
            if( !username_verify ){
                next(createError(404, "Username does not exists"));
            }

            // password update
            if( new_pass == con_pass && username_verify ){

                // update user
                await User.findOneAndUpdate(username_verify._id, {
                    password : has_pass
                });

                res.status(200).json({ message : "Password Changed successfully"});

            }
        }


        
    } catch (error) {
        next(error)
    }

}

