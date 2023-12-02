import { NextFunction, Request, Response } from "express";
import Book from "../models/book";
import BookCopy from "../models/bookcopy";

// TODO: add number of copy that are issued
export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, author, publicationYear, genre, description, numberOfCopies } = req.body;
    if (!title || !author || !numberOfCopies || !genre || !description 
      || !publicationYear || numberOfCopies < 1) {
      return res.status(400).send("Missing title or author");
    }

    const book = new Book({
      title,
      author,
      publicationYear,
      genre,
      description,
      numberOfCopies,
    });
    await book.save();

    const bookCopies = [];
    for (let i = 0; i < numberOfCopies; i++) {
      bookCopies.push(new BookCopy({ bookId: book._id }));
    }
    await BookCopy.insertMany(bookCopies);

    res.status(201).send("Book added successfully");
  } catch (error: any) {
    console.log("addBook Error: ", error.message);
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookUpdate = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bookUpdate) {
      return res.status(404).send("Book not found");
    }

    res.send("Book updated successfully");
  } catch (error: any) {
    console.log("updateBook Error: ", error.message);
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookDelete = await Book.findByIdAndDelete(req.params.id);
    if (!bookDelete) {
      return res.status(404).send("Book not found");
    }

    await BookCopy.deleteMany({ bookId: req.params.id });

    res.send("Book and associated copies deleted successfully");
  } catch (error: any) {
    console.log("deleteBook Error: ", error.message);
    next(error);
  }
};
