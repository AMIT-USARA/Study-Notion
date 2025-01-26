const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const cookieParser = require("cookie-parser");

exports.auth= (req,res,next)=>{
    try{
        // extract token
        const token = 
    req.body.token || 
    req.cookies?.token || 
    (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);
        //if token missing ,then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }

        //veerify thee token 

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
            
        } catch(error){
            //verification -issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            error:error.message,
            success:false,
            message:'Something went wrong, while verifying the token.',
        });
    }
}

// isStudent 
exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message: 'This is a protected routes for students.',
            })
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role cannot be verified, please try again.'
        })
    }
}

 // isInstructor
exports.isInstructor = (req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message: 'this is a protected routes for Instructor only.',
            })
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
}


// isAdmin
exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message: 'this is a protected routes for admin.',
            });
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again.',
        })
    }
}