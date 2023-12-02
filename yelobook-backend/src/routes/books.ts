import express from 'express';
import * as bookController from '../controllers/bookController';
import authenticate from '../middleware/authenticateMiddleware';

const router = express.Router();

router.get('/',authenticate,bookController.getAllBooks);

export default router;
