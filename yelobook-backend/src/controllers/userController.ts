import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId!).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error: any) {
    console.log("getUserProfile error: " + error.message);
    next(error);
  }
};

// export const getUserReservations = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.userId;
//     const reservations = await Reservation.find({ user: userId }).populate(
//       "copy"
//     );
//     res.json(reservations);
//   } catch (error: any) {
//     console.log("getUserReservation error: " + error.message);
//     next(error);
//   }
// };
