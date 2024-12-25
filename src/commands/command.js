import { bot } from "../debug/bot.js";
import { User } from "../entity/user.entity.js";
import { menuButtons } from "../keyboards/menu.keyboard.js";
import "../actions/index.js";
export function getMenuBar() {
    try {
        bot.api.setMyCommands([
            {
                command: "start",
                description:
                    "Ushbu buyruq botni ishga tushirish uchun ishlatilinadi.",
            },
            {
                command: "help",
                description: "Ushbu buyruq bot haqida ma'lumot beradi",
            },
        ]);
        console.log("Menu bar commands set successfully.");
    } catch (error) {
        console.error("Error setting menu bar:", error.message);
    }
}
bot.command("start", async (ctx) => {
    const userId = ctx.from.id;
    const first_name = ctx.from.first_name;
    const username = ctx.from.username;
    const last_name = ctx.from.last_name;
    const data = await User.findOne({ user_id: userId });
    if (!data) {
        const newUser = new User({
            user_id: userId,
            username,
            first_name,
            last_name,
        });
        await newUser.save();
    }
    ctx.reply(
        `<b>Assalomu alekum ${ctx.from.first_name}</b>\n<b>UstozShogir botining demo versiyasiga xush kelibsiz!</b>\n\n/help yordam buyrugi orqali nimalarga qodir ekanligimni bilib oling!`,
        { parse_mode: "HTML", reply_markup: menuButtons }
    );
});
bot.command("help", (ctx) => {
    ctx.reply(
        "Hackerlar tomonidan tuzilgan Ustoz - Shogird boti demo korishida\n\nBu yerda Programmalash bo'yicha\n  #Ustoz\n  #Shogird\n  #oquvKursi\n #Sherik\n #Xodim va\n  #IshJoyi\ntopishingiz mumkin.\n\nE'lonni ushbu bot orqali berishingiz mumkin boladi\nXatoliklar kuzatilsa adminga yozib qoldiring: @muhiddin0vvv"
    );
});
getMenuBar();
