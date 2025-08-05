const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User.model');

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10; 

exports.signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = new User({
            userName,
            email,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        res.status(201).json({
            message: "User registered successfully",
            user: savedUser,
        });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || "1h" } 
        );

        return res.json({
            message: "Login successful",
            token,
            user: {
                userName: user.userName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.currentUser = async (req, res) => {
    try {
        const token = req.header("Authorization")?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            userName: user.userName,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        console.error("Error fetching current user:", err);
        res.status(500).json({ message: "Server error" });
    }
};
