const {constants} = require("../constant");
//for handling error 
const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation error", message:  err.message, stackTrace: err.stack});
            
            break;
        case constants.UNAUTHORIZED_ERROR:
            res.json({title: "Unauthorized", message:  err.message, stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title: "Forbidden", message:  err.message, stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title: "Resource not found", message:  err.message, stackTrace: err.stack});
            break; 
        case constants.INTERNAL_SERVER_ERROR:
            res.json({title: "Server Error", message:  err.message, stackTrace: err.stack});
            break;        
        default:
            console.log("All Good")
            break;
    }
    //res.json({title: "its not found", message:  err.message, stackTrace: err.stack});
};
module.exports = errorHandler;