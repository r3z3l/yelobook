import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // JWT authentication logic
};

export default authenticate;
