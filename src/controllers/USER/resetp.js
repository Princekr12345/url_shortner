import ApiResponse from "../../utils/ApiResponse.js";
import { sendMail } from "../../utils/mailer.js";
import { Otp } from "../../models/otp.model.js";
import {TOTP} from "totp-generator";
import { User } from "../../models/user.model.js";

const resetUser = async (req,res)=> {
    try {
        const {email} = req.body;

        if(!email){
            return res.status(400).send(400,null,"Required Field missing");
        }
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).send(new ApiResponse(400, null, "User account does not exist."));
        };

        const {otp, expires} = TOTP.generate(process.env.OTP_KEY,{digits: 6,
            period: 600,
        });

        const createdOtpEntry = await Otp.create({code: otp,
            email,
            expiry: expires,
        });

        await sendMail(
            email,
            "OTP to Reset Password",
            `<h2>Your OTP is :<b>${otp}</b><h2><br/><p>It will expire in 10 minutes.</p>`
        );

        res.status(201).send(new ApiResponse(201, createdOtpEntry, "OTP sent successfully to " + email));
        
    } catch (error) {
        console.log(error);
        res.status(500).send(new ApiResponse(500, error, "Failed to reset"));
        
    }

}

export default resetUser;
