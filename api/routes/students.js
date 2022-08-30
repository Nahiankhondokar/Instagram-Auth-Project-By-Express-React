import express from 'express';
import { createStudent, getAllStudents, getSingleStudent, studentDelete, studentUpdate } from '../controllers/studentController.js';


// initialize 
const router = express.Router();



// student routes
router.route('/').get(getAllStudents).post(createStudent);
router.route('/:id').get(getSingleStudent).delete(studentDelete).put(studentUpdate).patch(studentUpdate);







// export moudle
export default router;