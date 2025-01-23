import { url } from "../../models/url.model.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const redirectUrl = async (req,res) =>{
    try {
        const {id} = req.params;
        console.log(id)

        const existingsUrl = await url.findOne({shortId: id})
        console.log(existingsUrl)
        if(!existingsUrl){
            return res.status(404).send(new ApiResponse(404,null,"This url does not exist."));
        }

        existingsUrl.clicks+=1;
        await existingsUrl.save();

        res.status(302).redirect(existingsUrl.original);

        
    } catch (error) {
        console.log(error);
        res.status(500).send(new ApiResponse(500, error, "Failed to redirect Url"));
        
    }
}

