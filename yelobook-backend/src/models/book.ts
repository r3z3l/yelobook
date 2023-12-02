import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  publicationYear: number;
  availabilityStatus: boolean;
  genre: string;
  description: string;
}

const bookSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  publicationYear: Number,
  availabilityStatus: { type: Boolean, default: true },
  genre: String,
  description: String
});

export default mongoose.model<IBook>('Book', bookSchema);
