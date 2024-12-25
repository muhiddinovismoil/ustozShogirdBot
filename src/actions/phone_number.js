import { User } from "../entity/user.entity.js";
import { bot } from "../debug/bot.js";
bot.on("message:contact", async (ctx) => {
    const contact = ctx.message.contact;
    const userId = ctx.from.id;
    const data = await User.findOne({ user_id: userId });
    if (data) {
        await User.updateOne(
            { user_id },
            { phone_number: contact.phone_number }
        );
    } else {
        await ctx.reply("👉 /start");
    }
});
