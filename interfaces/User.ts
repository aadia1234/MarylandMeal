import { Document, ObjectId } from "mongoose";
import Macros from "./Macros";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  foodLogIds: ObjectId[];
  currentWeight: number;
  goalWeight: number;
  goalMacros: Macros;
  allergens: string[];
  diningHallPreferences: string[];
}
