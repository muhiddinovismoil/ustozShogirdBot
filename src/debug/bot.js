import { Bot } from "grammy";
import { boot } from "../configs/index.js";
export const bot = new Bot(boot.bot_token);
