import User from "../models/user.model.js";
import { generateToken } from "../utils/token.js";
import cloudinary from "../utils/cloudinary.js";
export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if(!username || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password shouls be atleast 6 character long"})
        }
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        const newUser = new User({
            username,
            email,
            password,
        })
        if(newUser) {
            await newUser.save();
            generateToken(newUser._id, res);
            return res.json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            })
        } else {
            res.status(400).json({message: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
export const login = async (req, res) => {
    const {email, password}  = req.body;

    try {
        if(!email || !password ) {
            return res.status(400).json({message: "All fields are required"});
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(400).json({message:"Invalid Credentials"});
        }
        generateToken(user._id, res);
        return res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
        });
          
          
    } catch (error) {
        console.log("Error in login:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
export const logout = async (req, res) => {
    try {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      });
      return res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
};
export const getUserProfile = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await User.findById(userId).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        return res.json({
            _id: user._id,
            username: user.username,
            profilePic: user.profilePic,
            bio: user.bio,
        });
    } catch (error) {
        console.log("Error in getUserProfile:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
export const updateProfile = async (req, res) => {
    try {
      const { profilePic, bio } = req.body;
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Handle profile image upload
      if (profilePic) {
        // Delete old image if exists
        if (user.profilePicId) {
          await cloudinary.uploader.destroy(user.profilePicId);
        }
  
        // Upload new image
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
          folder: "profile_pics",
        });
  
        user.profilePic = uploadResponse.secure_url;
        user.profilePicId = uploadResponse.public_id;
      }
  
      // Update bio if provided
      if (bio) {
        user.bio = bio;
      }
  
      await user.save();
  
      return res.json({
        _id: user._id,
        username: user.username,
        profilePic: user.profilePic,
        bio: user.bio,
      });
    } catch (error) {
      console.log("Error in updateProfile:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
export const checkAuth = async (req, res) => {
    try {
        return res.json({
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            profilePic: req.user.profilePic,
            bio: req.user.bio,
        });
    } catch (error) {
        console.log("Error in checkAuth:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
