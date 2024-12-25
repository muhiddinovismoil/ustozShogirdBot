import mongoose, { Schema } from "mongoose";
const usersSchema = Schema(
    {
        user_id: {
            type: String,
            unique: true,
        },
        username: { type: String },
        first_name: { type: String },
        last_name: { type: String },
        phone_number: { type: String, unique: true },
        last_state: { type: String },
        tg_link: { type: String },
    },
    { timestamps: true }
);
export const User = mongoose.model("users", usersSchema);
