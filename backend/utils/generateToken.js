import jwt from "jsonwebtoken";
import {ENV_VARS} from  "../config/envVars.js";

export const generateTokenandSentCookie =(userId, res) =>{
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });
    res.cookie("jwt-netflix", token, {
        httpOnly: true, //prevent XSS attacks cross site scripting attacks , make it not accessed by js
        secure: process.env.NODE_ENV === "production", // code will only set to https in production mode
        sameSite: "strict",// prevents CSRF attacks cross site request forgery attacks
        maxAge: 1296000000, //15 days in msec
    });
    return token;
}; 