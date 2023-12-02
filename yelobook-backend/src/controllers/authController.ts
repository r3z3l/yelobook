import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const registerUser = async(req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).send('Missing username, password, or role');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Missing username or password');
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid Credentials');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
}