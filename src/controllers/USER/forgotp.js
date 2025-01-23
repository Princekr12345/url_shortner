import { Otp } from "../../models/otp.model.js";
import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrpt from "bcrypt";

export const forgotpassword = async (req, res)=>{
    try {
        const {email, otp, newpassword} = req.body;

        if(!email || !otp || !newpassword) {
            return res.status(400).send(new ApiResponse(400, null, "Requird Field missing"));
        }

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(404).send(new ApiResponse(404, null, "User with provided details does not exist"));
        
        }

        const existingOtp = await Otp.findOne({email});

        if(!existingOtp){
            return res.status(404).send(new ApiResponse(404,null,"Kindly request for an otp before trying to verify"));
        };

        if(parseInt(otp) !== parseInt(existingOtp.code)){
            return res.status(400).send(new ApiResponse(400, null, "Invalid credinitial"));
        };

        const hashed = await bcrpt.hash(newpassword, 10);

        existingUser.password = hashed;

        await existingUser.save();

        await existingOtp.deleteOne();

        res.status(200).send(new ApiResponse(200, null, "Password updated successfully."));
        
    } catch (error) {
        console.log(error);
        res.status(500).send(new ApiResponse(500,error,"Failed to verify user OTP."))
        
    }

}