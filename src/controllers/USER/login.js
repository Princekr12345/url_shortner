import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if( !email || !password){
            return res.status(400).send(new ApiResponse(400,null,"Required Field missing"));
        }

        const z = await User.findOne({
            email
        });

        if(!z){
            return res.status(404).send(new ApiResponse(404,null,"User does not exist"));
        };

        const verified = bcrypt.compare(password, z.password);

        if(!verified){
            return res.status(400).send(new ApiResponse(400,null,"INVALID CREDENTIALS"));
        }
        
        const x=jwt.sign({
            _id:z._id,
            name:z.name,
            email:z.email
        },process.env.Token_secrets,{expiresIn:"1d"});

        res.status(201).send(new ApiResponse(201,x,"Logged in successfully"));
        
    } catch (error) {
        console.log(error);
        res.status(500).send(new ApiResponse(500,error,"Failed to Login "));

        
    }
}

export{loginUser}