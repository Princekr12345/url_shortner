import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    original:{
        type:String,
        required: true
    },
    shortId:{
        type:String,
        required: true
    },
    clicks:{
        type:Number,
        default:0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true

    },
    
},
{timstamps:true}
);
 export const url = mongoose.model("url", urlSchema);