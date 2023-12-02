import express, { Request, Response } from 'express';
import * as bookController from '../../controllers/bookManagementController';
import authenticate from '../../middleware/authenticateMiddleware';
import authorize from '../../middleware/authorizeMiddleware';

const router = express.Router();

router.post('/', [authenticate, authorize], bookController.addBook);
router.put('/:id', [authenticate, authorize], bookController.updateBook);
router.delete('/:id', [authenticate, authorize], bookController.deleteBook);

export default router;
