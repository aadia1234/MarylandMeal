import { FoodDocument } from "./FoodDocument";

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  foodLog: {
    date: Date;
    foodId: number;
  };
  __v: number;
}
