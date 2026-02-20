import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

dotenv.config();

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 3. Frontend Static Files
// process.cwd() ensures we look in the project root, not the dist folder
// Uses process.cwd() to anchor to 'task-backend'
const frontendPath = path.join(process.cwd(), 'frontend', 'dist', 'task-tracker', 'browser');

// Log this to your terminal so you can verify it on Render logs
console.log('📂 Serving static files from:', frontendPath);

app.use(express.static(frontendPath));

// Catch-all route to serve index.html for Angular routing
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// 5. Database & Server Start
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📂 Serving frontend from: ${frontendPath}`);
        });
    })
    .catch((err: any) => console.error('❌ MongoDB connection error:', err.message));