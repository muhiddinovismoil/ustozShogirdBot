import express from "express";
import mongoose from "mongoose";
import { boot } from "./src/configs/index.js";
import routes from "./src/routes/index.js";
import "./src/debug/index.js";
import "./src/commands/command.js";
const app = express();
app.use(express.json());
app.use("/api/v1", routes);
app.listen(boot.port, async () => {
    try {
        await mongoose.connect(boot.mongoUri);
        console.log("Database connected successfully");
        console.log(`Server is running on PORT: ${boot.port}`);
    } catch (error) {
        console.log(`Xatolik yuz berdi ${error.message}`);
    }
});
