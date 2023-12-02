import express, { Request, Response } from "express";
import * as adminUserController from "../../controllers/adminUserController";
import authenticate from "../../middleware/authenticateMiddleware";
import authorize from "../../middleware/authorizeMiddleware";
import { validate } from "../../middleware/validateMiddleware";
import { body, param } from "express-validator";

const router = express.Router();

// api for fetching all users
router.get("/", authenticate, authorize, adminUserController.getAllUsers); 

// api for updating a user
router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("username").optional().isAlphanumeric(),
    body("email").optional().isEmail(),
    body("role").optional().isIn(["user", "admin"]),
  ],
  validate,
  authenticate,
  authorize,
  adminUserController.updateUser
);

//api for deleting a user
router.delete(
  "/:id",
  [param("id").isMongoId()],
  validate,
  authenticate,
  authorize,
  adminUserController.deleteUser
);

export default router;
