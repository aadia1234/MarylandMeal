import FoodLog from "@/interfaces/FoodLog";
import Macro from "@/interfaces/Macro";
import { Schema, model } from "mongoose";

const emptyMacros = {
  calories: 0,
  fats: 0,
  protein: 0,
  carbs: 0,
};

const MacroSchema = new Schema<Macro>({
  calories: Number,
  fats: Number,
  protein: Number,
  carbs: Number,
});

const FoodLogSchema = new Schema<FoodLog>(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    target: {
      type: MacroSchema,
      required: true,
    },
    consumed: {
      type: MacroSchema,
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
