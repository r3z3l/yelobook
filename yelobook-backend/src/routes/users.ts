import express, { Request, Response } from 'express';
import User from '../models/user';
import Reservation from '../models/reservation';
import authenticate from '../middleware/authenticateMiddleware';

const router = express.Router();

router.get('/profile', authenticate, async (req: Request, res: Response) => { /*... Profile logic ...*/ });
router.get('/reservations', authenticate, async (req: Request, res: Response) => { /*... Reservations logic ...*/ });

export default router;
