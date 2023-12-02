import * as express from 'express';
import { IUser } from "../../src/models/user";

// custom interface
declare global {
  namespace Express {
    interface Request {
      userId?: IUser._id;
      role?: IUser.role;
    }
  }
}
