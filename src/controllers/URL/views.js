import { url } from "../../models/url.model.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const getViews = async (req, res) =>{
    try {
        const {id} = req.params;

        const existingUrl = await url.findOne({shortId:id});

        if(!existingUrl){
            return res.status(404).send(new ApiResponse(404,null,"Url with provided Id does not exist"));
        }
        res.status(200).send(new ApiResponse(200,{views:existingUrl.clicks},"Fethched analytics successfully"));
        
    } catch (error) {
        console.log(error);
        res.status(500).send(new ApiResponse(500,error,"Failed to views url"));
        
    }
}
