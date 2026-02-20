import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ username, password }); // Password hashed via model middleware
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error during registration' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
};