import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password ) {
      return res.status(400).send('Missing username, email or password');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    res.status(201).send('User registered successfully');
  } catch (error: any) {
    console.log("registerUser error: ", error.message);
    next(error);
  }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Missing email or password');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid Credentials');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY || 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, role:user.role });
  } catch (error: any) {
    console.log("loginUser error: ", error.message);
    next(error); 
  
  }
}