import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validateMiddleware';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/register',[
    body('username').isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 5 characters'),
],
validate,
authController.registerUser);
router.post('/login', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
],
validate,
authController.loginUser);

export default router;
