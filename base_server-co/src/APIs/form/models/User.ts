import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  forms: Array<string>; // Array of form IDs created by the user
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  forms: [{ type: Schema.Types.ObjectId, ref: 'Form' }],
});

export default mongoose.model<User>('User', userSchema);
