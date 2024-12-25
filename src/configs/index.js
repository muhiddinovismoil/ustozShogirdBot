import { config } from "dotenv";
config();
export const boot = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    bot_token: process.env.BOT_TOKEN,
    channel_id: process.env.CHANNEL_ID,
};
