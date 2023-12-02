import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")!.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing" });
    }

    const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'your_secret_key');

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = user._id;
    req.role = user.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticate;
