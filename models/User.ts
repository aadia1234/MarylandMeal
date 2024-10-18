import mongoose, { Schema, model } from 'mongoose';

export interface UserDocument {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
const UserSchema = new Schema<UserDocument>(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
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
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);
export default User;
