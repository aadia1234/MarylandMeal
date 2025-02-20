import Macros from "@/interfaces/Macros";
import { Schema } from "mongoose";

export default new Schema<Macros>({
  calories: Number,
  fats: Number,
  protein: Number,
  carbs: Number,
});
