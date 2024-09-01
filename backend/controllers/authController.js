const User = require('../models/User'); 
const bcrypt = require('bcrypt');        

// Register user
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log('Received registration request body:', req.body);
        

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', existingUser.email);
            return res.status(400).json({ error: "User already exists with this email" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            username,
            email,
            password: hashedPassword, 
        });

        // Save the new user
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error('Error registering the user:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        console.log('Received login request body:', req.body); // Log the login request

        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch for user:', email);
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Successful login
        console.log('Login successful for user:', email);
        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error('Error logging in the user:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser };
