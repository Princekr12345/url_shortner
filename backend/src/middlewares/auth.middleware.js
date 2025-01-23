import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

export const checkIsLoggedIn = (req, res, next) =>{
    //receive the token
    const bearerAuth = req.headers.authorization;

    //if bearerAuth is empty
    if(!bearerAuth){
        return res.status(400).send(new ApiResponse(400,null,"Missing Bearer Auth header"));
    }

    //If it is present ,extract token
    const token = bearerAuth.split(" ")[1];

    if(!token){
        return res.status(400).send(new ApiResponse(400,null,"Missing Token"));
    }

    //IF token is present then 
    const decodedInformation = jwt.verify(token, process.env.Token_secrets);

    //If not decodedInformation
    if(!decodedInformation){
        res.status(400).send(new ApiResponse(400, null, "Invalid token"));
    }
    req.user = decodedInformation;
    next(); //middleware is complete



}