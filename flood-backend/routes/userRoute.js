import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js"
import jwt from "jsonwebtoken";
import Assessment from "../models/Assessment.js";
const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already registered. Please login." });
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            password: hashpassword
        })
        return res.status(201).send({
            message: "User Created Successfully !",
            data: user,
            success: true
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    try {
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(401).json({ success: false, message: "User does not exist. Create your account" });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { email: userExist.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                email: userExist.email,
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

userRouter.get('/get-user', async (req, res) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1]
        let email
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            email = decoded.email
        }
        const user = await User.findOne({ email })
        res.status(200).json({
            success: true,
            data: user.email,
            message: "User data fetched"
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching assessments', error: error.message });
    }
})



export default userRouter