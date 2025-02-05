import { Document, ObjectId } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  foodLogIds: ObjectId[];
}
