import FoodLogDocument from "./FoodLogDocument";
import MacroDocument from "./MacroDocument";

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  foodLog: FoodLogDocument[];
  
}
