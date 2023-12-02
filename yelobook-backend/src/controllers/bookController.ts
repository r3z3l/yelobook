import { NextFunction, Request, Response } from 'express';
import BookCopy from '../models/bookcopy';

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let query = BookCopy.find().populate('bookId');
        if (req.query.status){
            const status = String(req.query.status);
            query = query.where('status').equals(status);
        }
        const books = await query.exec();
        res.json(books);
    } catch (error: any) {
        console.log("getAllBooks error: ", error.message);
        next(error);
    }
};
