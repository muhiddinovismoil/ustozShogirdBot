import { bot } from "../debug/bot.js";
bot.on("message", async (ctx) => {
    const text = ctx.message.text;
    if (text === "Sherik kerak") {
        await ctx.reply("You selected Sherik kerak");
    } else if (text === "Ish joyi kerak") {
        await ctx.reply("You selected Ish joyi kerak");
    } else if (text === "Hodim kerak") {
        await ctx.reply("You selected Hodim kerak kerak.");
    } else if (text === "Ustoz kerak") {
        await ctx.reply("You selected Ustoz kerak kerak.");
    } else if (text === "Shogird kerak") {
        await ctx.reply("You selected Shogird kerak kerak.");
    }
});
