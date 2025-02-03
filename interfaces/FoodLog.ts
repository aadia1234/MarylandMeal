import Macro from "./Macro";

export default interface FoodLog {
  userId: Number;
  date: Date;
  target: Macro;
  consumed: Macro;
  ids: { id: number; quantity: number }[];
}
