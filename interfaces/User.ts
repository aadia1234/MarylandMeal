import { ObjectId } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  foodLogIds: ObjectId[];
}
