import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    code:{
        type:Number,
        required: true,
    },
    expiry:{
        type: Date,
        default: new Date(Date.now() + 600000), // 10 mins from Date.now(),

    }
});
export const Otp = mongoose.model("Otp", otpSchema);