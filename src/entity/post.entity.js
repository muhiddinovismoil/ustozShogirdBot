import mongoose, { Schema } from "mongoose";
const postsSchema = Schema(
    {
        user_id: { type: String },
        category: { type: String },
        post_id: { type: String, unique: true },
        tg_link: { type: String },
        name: { type: String },
        age: { type: String },
        phone: { type: String },
        technology: { type: String },
        degree: { type: String },
        working_place: { type: String },
        working_time: { type: String },
        salary: { type: String },
        region: { type: String },
        call_time: { type: String },
        info: { type: String },
        ads_state: { type: String },
    },
    { timestamps: true }
);
export const Posts = mongoose.model("posts", postsSchema);
