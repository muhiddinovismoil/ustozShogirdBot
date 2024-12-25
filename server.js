import express from "express";
import mongoose from "mongoose";
import { bot } from "./src/debug/bot.js";
import { boot } from "./src/configs/index.js";
import routes from "./src/routes/index.js";
const app = express();
app.use(express.json());
app.use("/api/v1", routes);
app.listen(boot.port, async () => {
    try {
        await mongoose.connect(boot.mongoUri);
        bot.start();
        console.log("Bot is running");
        console.log("Database connected successfully");
        console.log(`Server is running on PORT: ${boot.port}`);
    } catch (error) {
        console.log(`Xatolik yuz berdi ${error.message}`);
    }
});
