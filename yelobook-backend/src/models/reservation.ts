import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';
import { IBook } from './book';

export interface IReservation extends Document {
  book: IBook['_id'];
  user: IUser['_id'];
  reservationDate: Date;
  returnDate: Date;
  status: 'Reserved' | 'Returned';
}

const reservationSchema: Schema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reservationDate: { type: Date, default: Date.now },
  returnDate: Date,
  status: { type: String, enum: ['Reserved', 'Returned'], default: 'Reserved' }
});

export default mongoose.model<IReservation>('Reservation', reservationSchema);
