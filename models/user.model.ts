import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Use 'this: IUser' to fix the 'any' type error
userSchema.pre('save', async function (this: IUser) {
    if (!this.isModified('password')) {
        return; // No need for next(), returning tells Mongoose to continue
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error: any) {
        throw error; // Throwing an error tells Mongoose to stop the save
    }
});

export const User = mongoose.model<IUser>('User', userSchema);