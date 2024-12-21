import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/envVars.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies['jwt-netflix'];
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided. Please log in." });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        } catch (err) {
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
            } else if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: "Token expired. Please log in again." });
            } else {
                throw err; 
            }
        }

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found. Please register again." });
        }

        req.user = user; 
        next();

    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
