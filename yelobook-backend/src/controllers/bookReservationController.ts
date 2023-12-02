import { NextFunction, Request, Response } from "express";
import BookCopy from "../models/bookcopy";
import Reservation from "../models/reservation";

export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { copyId } = req.body;
    const userId = req.userId;

    // Check if the book copy is available
    const bookCopy = await BookCopy.findOne({
      _id: copyId,
      status: "available",
    });
    if (!bookCopy) {
      return res.status(400).send("Book is not available.");
    }

    // Create a new reservation
    const newReservation = new Reservation({
      copy: copyId,
      user: userId,
      reservationDate: new Date(),
      status: "pending", // Default status
    });

    // Save the reservation
    await newReservation.save();

    // Update the book copy status to 'Reserved'
    bookCopy.status = "available";
    await bookCopy.save();

    res.status(201).send(newReservation);
  } catch (error: any) {
    console.log("createReservation Error: " + error.message);
    next(error);
  }
};

// View a specific reservation
export const viewReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findById(reservationId)
      .populate("book")
      .populate("user", "username email");

    if (!reservation) {
      return res.status(404).send("Reservation not found.");
    }

    res.status(200).send(reservation);
  } catch (error: any) {
    console.log("viewReservation Erro: " + error.message);
    next(error);
  }
};

export const viewUserReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;

    // Find reservations made by the user
    const reservations = await Reservation.find({ user: userId })
      .populate({
        path: "copy",
        populate: {
          path: "bookId",
          select: "title author publicationYear",
        },
      })
      .populate("user", "username email");

    if (!reservations.length) {
      return res.status(404).send("No reservations found for this user.");
    }

    res.status(200).json(reservations);
  } catch (error: any) {
    console.log("viewUserReservation Error: " + error.message);
    next(error);
  }
};

// Update reservation status (e.g., approve, deny)
export const updateReservationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservationId = req.params.id;
    const { status } = req.body;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).send("Reservation not found.");
    }

    // Update the reservation status
    reservation.status = status;
    await reservation.save();
    const bookCopy = await BookCopy.findById(reservation.copy._id);
    
    if (reservation.status === "reserved") {
      bookCopy!.status = "borrowed";
    }else if(reservation.status === "returned"){
      bookCopy!.status = "available";
    }
    await bookCopy!.save();
    res.status(200).send("Reservation status updated.");
  } catch (error: any) {
    console.log("updateReservationStatus Error: " + error.message);
    next(error);
  }
};

export const viewAllReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservations = await Reservation.find()
      .populate({
        path: "copy",
        populate: {
          path: "bookId",
          select: "title author publicationYear",
        },
      })
      .populate("user");
    res.json(reservations);
  } catch (error: any) {
    console.log("viewAllReservation Error: " + error.message);
    next(error);
  }
};
