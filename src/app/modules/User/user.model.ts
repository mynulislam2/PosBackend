import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.inferface";

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  }

);
export const User = model<IUser, UserModel>('User', userSchema);