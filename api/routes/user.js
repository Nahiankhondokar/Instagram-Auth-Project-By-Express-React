import express from 'express';
import { createUser, getAllUser, getSingleUser, UserDelete, userLogin, userRegister, UserUpdate, getLoggedInUser, userAccountVerify, userForgotPassword } from '../controllers/userController.js';




// initialize 
const router = express.Router();



// login register routes
router.post('/login', userLogin);
router.post('/register', userRegister);

// logged in user data fetch
router.get('/me', getLoggedInUser);

// account verify route
router.post('/verify', userAccountVerify);

// forgot password route
router.post('/forgot/password', userForgotPassword);

// student routes
router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getSingleUser).delete(UserDelete).put(UserUpdate).patch(UserUpdate);





// export moudle
export default router;