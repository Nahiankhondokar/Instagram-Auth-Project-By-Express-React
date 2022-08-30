

// error handler funciton
const errorHandler = (error, req, res, next) => {

    // custom error manage
    const errorStatus = error.status || 500;
    const errorMessage = error.message || 'Unknown Error';

    return res.status(errorStatus).json({
        message : errorMessage,
        status : errorStatus,
        stack : error.stack
    });

}


// export 
export default errorHandler;