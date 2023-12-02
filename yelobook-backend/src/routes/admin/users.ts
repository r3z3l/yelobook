import express, { Request, Response } from 'express';
import User from '../../models/user';
import authenticate from '../../middleware/authenticateMiddleware';
import authorize from '../../middleware/authorizeMiddleware';

const router = express.Router();

router.get('/', [authenticate, authorize], async (req: Request, res: Response) => { /*... Admin view users logic ...*/ });
router.put('/:id', [authenticate, authorize], async (req: Request, res: Response) => { /*... Update user logic ...*/ });
router.delete('/:id', [authenticate, authorize], async (req: Request, res: Response) => { /*... Delete user logic ...*/ });

export default router;
