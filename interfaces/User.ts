import FoodLogDocument from "./FoodLog";
import Macro from "./Macro";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  foodLog: FoodLogDocument[];
}
