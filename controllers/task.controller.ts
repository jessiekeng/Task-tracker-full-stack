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

// 3. UPDATE A TASK (toggle completed or edit fields)
export const updateTask = async (req: any, res: Response) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedTask);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

// 4. DELETE A TASK
export const deleteTask = async (req: any, res: Response) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};