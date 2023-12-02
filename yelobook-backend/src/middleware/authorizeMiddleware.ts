import { Request, Response, NextFunction } from "express";

const authorize = (req: Request, res: Response, next: NextFunction) => {
  if (!req.role) {
    return res.status(401).send("Access denied. No user information found.");
  }
  if(req.role !== "admin"){
    return res.status(401).send("Access denied. You are not admin.");
  }
  next();
};

export default authorize;
