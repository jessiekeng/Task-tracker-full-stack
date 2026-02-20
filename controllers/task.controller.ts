import { Request, Response } from 'express';
import { Task } from '../models/task.model';

// 1. GET ALL TASKS (For the logged-in user)
export const getTasks = async (req: any, res: Response) => {
    try {
        // We use req.user.id which was attached by your protect middleware
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

// 2. CREATE A NEW TASK
export const createTask = async (req: any, res: Response) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newTask = new Task({
            title,
            user: req.user.id // Link the task to the user from the JWT token
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};