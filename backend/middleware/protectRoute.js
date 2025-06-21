import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const protectRoute = async (req, res, next) => {
    const token=req.cookies.jwt;
    if(!token) {
        return res.status(401).json({message: "Unauthorized, no token provided"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(401).json({message: "Unauthorized, user not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute:", error);
        return res.status(401).json({message: "Unauthorized, invalid token"});
    }
}

