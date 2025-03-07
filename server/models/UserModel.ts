import { User } from "@/interfaces/User";
import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import MacrosSchema from "./MacrosSchema";
import { Allergen } from "@/types/Allergen";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    foodLogIds: {
      type: [{ type: ObjectId, ref: "FoodLogModel" }],
      required: true,
    },
    currentWeight: {
      type: Number,
      required: true,
    },
    goalWeight: {
      type: Number,
      required: true,
    },
    goalMacros: {
      type: MacrosSchema,
      required: false,
    },
    allergens: {
      type: [String],
      required: false,
    },
    diningHallPreferences: {
      type: [String],
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
