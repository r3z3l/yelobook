import express from "express";
import * as bookReservationController from "../controllers/bookReservationController";
import authenticate from "../middleware/authenticateMiddleware";
import authorize from "../middleware/authorizeMiddleware";
import { body, param } from "express-validator";
import { validate } from "../middleware/validateMiddleware";

const router = express.Router();


// get all reservations
router.get(
  "/",
  authenticate,
  authorize,
  bookReservationController.viewAllReservations
); 

// get reservation by user id 
router.get(
  "/:id",
  param("id").isMongoId(),
  validate,
  authenticate,
  bookReservationController.viewUserReservations
); 


// create a new reservation 
router.post(
  "/",
  [body("copyId").isMongoId()],
  validate,
  authenticate,
  bookReservationController.createReservation
); 

// update a reservation
router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("status").isIn(["reserved", "pending", "returned"]),
  ],
  validate,
  authenticate,
  authorize,
  bookReservationController.updateReservationStatus
); 

export default router;
