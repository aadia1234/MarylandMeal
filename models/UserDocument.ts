import FoodLogDocument from "./FoodLogDocument";

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
