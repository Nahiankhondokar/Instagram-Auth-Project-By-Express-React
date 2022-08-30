import Student from './../models/Student.js';
import bcrypt from 'bcryptjs';
import createError from './errorController.js';


/**
 *  @access Public
 *  @route api/students
 *  @method GET
 */
export const getAllStudents = async (req, res, next) => {
   
    try {
        const students = await Student.find();

        // error show if data can not find.
        if(!students){
            next(createError(404, "Students not found"));
        }

        // if data find
        if(students){
            res.status(200).json({students});
        }
        
    } catch (error) {
        
        next(error);

    }

}



/**
 *  @access Public
 *  @route api/students
 *  @method POST
 */
 export const createStudent = async (req, res) => {

    // get all data
    const { name, email, cell, age, gender, password, username, photo } = req.body;

    // hash password
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash(req.body.password, salt);
    
    try {
        
        await Student.create({
            ...req.body, 
            password : hash
        }, { new : true });

        res.status(200).json({
            message : "sutdent Created"
        });

    } catch (error) {
        console.log(error);
    }

}



/**
 *  @access Public
 *  @route api/students/:id
 *  @method GET
 */
 export const getSingleStudent = async (req, res, next) => {

    const { id } = req.params;
    
    try {
        const single = await Student.findById(id);

        // error show if data can not find.
        if(!single){
            next(createError(404, "Single Student not found"));
        }

        // if data find
        if(single){
            res.status(200).json({students});
        }

        res.status(200).json({single});
    } catch (error) {



    }

}



/**
 *  @access Public
 *  @route api/students/:id
 *  @method PUT/PATCH
 */
 export const studentUpdate = async (req, res) => {
    
    // get all data
    const { id } = req.params;
    const { name, email, cell, age, gender, password, username, photo } = req.body;

    try {
        const update = await Student.findByIdAndUpdate(id, {
           ...req.body 
        }, { new : true});

        res.status(200).json({
            message : "Student Updated"
        });
    } catch (error) {
        console.log(error);
    }

}



/**
 *  @access Public
 *  @route api/students/:id
 *  @method DELETE
 */
 export const studentDelete = async (req, res) => {

    // get id
    const { id } = req.params;
    
    try {
        const students = await Student.findByIdAndDelete(id);
        res.status(200).json({
            message : "Student deleted"
        });
    } catch (error) {
        console.log(error);
    }

}


