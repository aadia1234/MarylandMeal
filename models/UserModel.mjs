import { Schema, model } from "mongoose";

// fix this and make it typescript!
const UserSchema = new Schema(
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
    foodLog: {
      type: [
        {
          date: Date,
          macros: [
            {
              target: {
                calories: Number,
                fats: Number,
                protein: Number,
                carbs: Number,
              },
              consumed: {
                calories: Number,
                fats: Number,
                protein: Number,
                carbs: Number,
              },
            },
          ],
          ids: [
            {
              id: Number,
              quantity: Number,
            },
          ],
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
