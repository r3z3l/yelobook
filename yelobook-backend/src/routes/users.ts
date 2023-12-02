import express from 'express';
import * as userController from "../controllers/userController";
import authenticate from '../middleware/authenticateMiddleware';

const router = express.Router();

router.get('/', authenticate, userController.getUserProfile);
// router.get('/reservations', authenticate, userController.getUserReservations);

export default router;
