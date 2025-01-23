import { url } from "../../models/url.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import crypto from "crypto";

export const shrinkUrl = async (req,res) =>{
    try {
        const {original} = req.body;

        if(!original){
            return res.status(400).send(new ApiResponse(400,null,"Required field missing"));
        };

        let sid = crypto.randomBytes(3).toString("hex");


        let existingUrl = await url.findOne({
            shortId:sid,
        })

        while(existingUrl){
            let sid = crypto.randomBytes(3).toString("hex");


           let existingUrl = await url.findOne({
                shortId:sid,
            })

        }
        

        const createdUrl = await url.create({
            original,
            shortId:sid,
            createdBy: req.user._id,
        })
        
        res.status(201).send(new ApiResponse(201,createdUrl,"URL shrink successfully."))

        
    } catch (error) {
        console.log(error);
        res.status(500).send(new ApiResponse(500,error,"Failed to shrinkURL"));
        
    }
}