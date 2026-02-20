import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the Interface for TypeScript
export interface ITask extends Document {
    title: string;
    completed: boolean;
    user: mongoose.Types.ObjectId; // Reference to the User who owns this task
}

// 2. Define the Schema
const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // This must match the name used in mongoose.model('User', ...)
        required: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// 3. Export the Model
export const Task = mongoose.model<ITask>('Task', taskSchema);