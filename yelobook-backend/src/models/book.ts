import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  publicationYear: number;
  availabilityStatus: boolean;
  genre: string;
  description: string;
  numberOfCopies: number;
}

const bookSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  publicationYear: Number,
  availabilityStatus: { type: Boolean, default: true },
  genre: String,
  description: String,
  numberOfCopies: { type: Number, required: true, min: 1, default: 1 },
});

export default mongoose.model<IBook>('Book', bookSchema);
