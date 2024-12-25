import { bot } from "../debug/bot.js";
bot.on("message", async (ctx) => {
    const text = ctx.message.text;
    if (text === "Sherik kerak") {
        await ctx.reply("You selected Sherik kerak");
    } else if (text === "Ish joyi kerak") {
        await ctx.reply("You selected Ish joyi kerak");
    } else {
        await ctx.reply("Please choose a valid option.");
    }
});
