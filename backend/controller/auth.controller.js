import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenandSentCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { userName, email, password } = req.body;

        // Validate required fields
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Validate password
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long!" });
        }
        if (!/\d/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one digit!" });
        }
        if (!/[a-zA-Z]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one alphabet!" });
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one special character!" });
        }
        if (/\s/.test(password)) {
            return res.status(400).json({ message: "Password must not contain any whitespace!" });
        }
        if (password.includes(userName)) {
            return res.status(400).json({ message: "Password must not contain username!" });
        }
        if (password.includes(email)) {
            return res.status(400).json({ message: "Password must not contain email!" });
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format!" });
        }

        // Check for existing email
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Check for existing username
        const existingUserByUserName = await User.findOne({ userName });
        if (existingUserByUserName) {
            return res.status(400).json({ message: "Username already exists!" });
        }
       
        // Random profile picture
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png", "/avatar4.png"];
        const profilePic = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        // Create new user
        const newUser = new User({
            userName,
            email,
            password:hashedPassword, 
            image: profilePic,
        });
        
        
        generateTokenandSentCookie(newUser._id, res);
        await newUser.save();
       

        

        // Return success response
        res.status(201).json({
			success: true,
			user: {
				...newUser._doc,
				password: "",
			},
		});
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function login(req,res){
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"All fields are required!"});
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials!"});
        }

        const isPasswordValid = await bcryptjs.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials!"});
        }
        generateTokenandSentCookie(user._id, res);
        
        res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});
    } catch(error){
        console.error("Error in login controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function logout(req,res){
    try{
        res.clearCookie("jwt-netflix");
        return res.status(200).json({message:"Logged out successfully"});
    } catch(error){
        console.error("Error in logout controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function authCheck(req,res){
    try{
        return res.status(200).json({success:true ,message:req.user});
    } catch(error){
        console.error("Error in authCheck controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}