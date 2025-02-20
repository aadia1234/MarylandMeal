import Macros from "./Macros";
import { ObjectId } from "mongoose";

export default interface FoodLog {
  userId: ObjectId;
  date: Date;
  target: Macros;
  consumed: Macros;
  ids: { id: number; quantity: number }[];
}
