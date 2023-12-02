import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'Admin' | 'Member';
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Member'] }
});


export default mongoose.model<IUser>('User', userSchema);
