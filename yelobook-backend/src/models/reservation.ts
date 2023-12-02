import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';
import { IBookCopy } from './bookcopy';

export interface IReservation extends Document {
  copy: IBookCopy['_id'];
  user: IUser['_id'];
  reservationDate: Date;
  returnDate: Date;
  status: 'reserved' | 'pending' | 'returned';
}

const reservationSchema: Schema = new Schema({
  copy: { type: Schema.Types.ObjectId, ref: 'BookCopy', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reservationDate: { type: Date, default: Date.now },
  returnDate: Date,
  status: { type: String, enum: ['reserved', 'pending', 'returned'], default: 'pending' }
});

export default mongoose.model<IReservation>('Reservation', reservationSchema);
