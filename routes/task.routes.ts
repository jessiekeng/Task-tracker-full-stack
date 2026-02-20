import { Router } from 'express';
import { getTasks, createTask } from '../controllers/task.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.get('/', protect, getTasks);
router.post('/', protect, createTask);

export default router;