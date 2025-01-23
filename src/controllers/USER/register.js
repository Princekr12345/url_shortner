import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).send(new ApiResponse(400,null,"Required Fields missing"));
        }

        const existingUser = await User.findOne({
            email
        });
        if(existingUser){
            return res.status(409).send(new ApiResponse(409,existingUser,"Invalid"))
        }
        const hashed = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password : hashed,
        });

        res.status(201).send(new ApiResponse(201,newUser,"Register successfully"));
        
    } catch (error) {
        console.log(error);
        res.status(500).send(new ApiResponse(500,error,"Failed to register"));
        
    }
}

export default registerUser;