import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validateMiddleware';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/register',[
    body('username').isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 5 characters'),
],
validate,
authController.registerUser);
router.post('/login', [
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
],
validate,
authController.loginUser);

export default router;
