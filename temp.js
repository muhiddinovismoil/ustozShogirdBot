import express from "express";
import { Bot, InlineKeyboard } from "grammy";
import { config } from "dotenv";
config();
const app = express();
app.use(express.json());
const bot = new Bot(process.env.BOT_TOKEN);
const isSubscribed = async (userId) => {
    try {
        const chatMember = await bot.api.getChatMember(
            "@codingwithismoil",
            userId
        );
        const status = chatMember.status;
        return ["member", "administrator", "creator"].includes(status);
    } catch (error) {
        console.error("Error checking subscription:", error.message);
        return false;
    }
};
const subscriptionButtons = new InlineKeyboard()
    .url("Kanalga obuna bo'ling", "https://t.me/codingwithismoil")
    .row()
    .text("Tasdiqlash ✅", "confirm_subscription");
bot.command("start", async (ctx) => {
    isSubscribed;
    ctx.reply(
        "Xush kelibsiz! Botning barcha hususiyatlaridan foydalanish uchun kanallarga obuna bo'ling va 'Tasdiqlash ✅' tugmasini bosing.",
        { reply_markup: subscriptionButtons }
    );
});
bot.callbackQuery("confirm_subscription", async (ctx) => {
    const userId = ctx.from.id;
    try {
        if (await isSubscribed(userId)) {
            await ctx.reply(
                "Rahmat! Siz kanallarga obuna bo'lgansiz. Botdan foydalanishingiz mumkin."
            );
            await ctx.answerCallbackQuery("Obuna tasdiqlandi!");
        } else {
            await ctx.reply(
                "Afsuski, siz hali kanallarga obuna bo'lmadingiz. Iltimos, [kanalga obuna bo'ling](https://t.me/codingwithismoil) va qayta urinib ko'ring.",
                { parse_mode: "Markdown" }
            );
            await ctx.answerCallbackQuery("Obuna tasdiqlanmadi.");
        }
    } catch (error) {
        console.error(
            "Error handling subscription confirmation:",
            error.message
        );
        await ctx.reply(
            "Obuna holatini tekshirishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        );
    }
});
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
    console.log("Bot is started");
    bot.start();
});
