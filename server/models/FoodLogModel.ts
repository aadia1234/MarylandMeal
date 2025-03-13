import FoodLog from "@/interfaces/FoodLog";
// import { emptyMacros } from "@/interfaces/Macros";
import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import MacrosSchema from "./MacrosSchema";

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
      default: {
        calories: 0,
        fats: 0,
        protein: 0,
        carbs: 0,
      }
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
