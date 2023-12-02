import express from "express";
import { body, param } from "express-validator";
import * as bookController from "../../controllers/bookManagementController";
import authenticate from "../../middleware/authenticateMiddleware";
import authorize from "../../middleware/authorizeMiddleware";
import { validate } from "../../middleware/validateMiddleware";

const router = express.Router();

// api for adding a book
router.post(
  "/",
  [
    body("title").notEmpty().isString().withMessage("Title is required"),
    body("author").notEmpty().isString().withMessage("Author is required"),
    body("publicationYear")
      .notEmpty()
      .isNumeric()
      .withMessage("Publication year is required"),
    body("genre").notEmpty().isAlpha().withMessage("Genre is required"),
    body("description")
      .notEmpty()
      .isString()
      .withMessage("Description is required"),
    body("numberOfCopies")
      .notEmpty()
      .isNumeric()
      .withMessage("Number of copies is required"),
  ],
  validate,
  authenticate,
  authorize,
  bookController.addBook
);

//api for updating a book
router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("title").optional().isString().withMessage("Title is required"),
    body("author").optional().isString().withMessage("Author is required"),
    body("publicationYear")
      .optional()
      .notEmpty()
      .isNumeric()
      .withMessage("Publication year is required"),
    body("genre").optional().isAlpha().withMessage("Genre is required"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description is required"),
  ],
  validate,
  authenticate,
  authorize,
  bookController.updateBook
);

//api for deleting a book
router.delete(
  "/:id",
  [param("id").isMongoId()],
  validate,
  authenticate,
  authorize,
  bookController.deleteBook
);

export default router;
