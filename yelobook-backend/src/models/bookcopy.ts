import mongoose, { Schema, Document} from "mongoose";
import { IBook } from "./book";
import { IReservation } from "./reservation";

export interface IBookCopy extends Document {
    bookId: IBook["_id"];
    status: "available"  | "borrowed";
    borrower: IReservation["_id"][];
}

const bookCopySchema: Schema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    status: { type: String, enum: ["available", "borrowed"], default: "available" },
    borrower: [{ type: Schema.Types.ObjectId, ref: "Reservation" }]
});

export default mongoose.model<IBookCopy>("BookCopy", bookCopySchema);