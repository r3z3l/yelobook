import { NextFunction, Request, Response } from 'express';
import User from '../models/user';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error: any) {
    console.log('getAllUsers Error: ', error.message);
    next(error);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(user) {
      return res.status(400).send('Email already exists');
    }
    const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!userUpdate) {
      return res.status(404).send('User not found');
    }

    res.json(userUpdate);
  } catch (error: any) {
    console.log(' Error: ', error.message);
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(req.params.id === req.userId) {
      return res.status(400).send('You cannot delete yourself');
    }
    const userDelete = await User.findByIdAndDelete(req.params.id).select('-password');
    if (!userDelete) {
      return res.status(404).send('User not found');
    }

    res.json(userDelete);
  } catch (error: any) {
    console.log(' Error: ', error.message);
    next(error);
  }
}
