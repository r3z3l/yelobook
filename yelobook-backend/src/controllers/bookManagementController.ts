import { Request, Response } from 'express';
import Book from '../models/book';

export const addBook =  async (req: Request, res: Response) => {
  try {
    const { title, author, publicationYear, genre, description } = req.body;
    if (!title || !author) {
      return res.status(400).send('Missing title or author');
    }

    const book = new Book({ title, author, publicationYear, genre, description });
    await book.save();

    res.status(201).send('Book added successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
}

export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookUpdate = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bookUpdate) {
      return res.status(404).send('Book not found');
    }

    res.send('Book updated successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookDelete = await Book.findByIdAndDelete(req.params.id);
    if (!bookDelete) {
      return res.status(404).send('Book not found');
    }

    res.send('Book deleted successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
}
