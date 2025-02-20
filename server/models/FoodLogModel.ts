import FoodLog from "@/interfaces/FoodLog";
import Macros from "@/interfaces/Macros";
import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import MacrosSchema from "./MacrosSchema";

const emptyMacros = {
  calories: 0,
  fats: 0,
  protein: 0,
  carbs: 0,
};

const FoodLogSchema = new Schema<FoodLog>(
  {
    userId: {
      type: ObjectId,
      ref: "UserModel",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    target: {
      type: MacrosSchema,
      required: true,
    },
    consumed: {
      type: MacrosSchema,
      default: emptyMacros,
    },
    ids: {
      type: [
        {
          id: Number,
          quantity: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const FoodLogModel = model("FoodLog", FoodLogSchema);

export default FoodLogModel;
