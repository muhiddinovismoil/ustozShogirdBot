import { bot } from "../debug/bot.js";
import { menuButtons } from "../keyboards/menu.keyboard.js";
const userSteps = {};
const startFlow = async (ctx, type) => {
    const userId = ctx.chat.id;
    userSteps[userId] = { step: "name", type };

    const introMessage = `${type} uchun ariza berish\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to\`g\`ri bo\`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`;

    await ctx.reply(introMessage);
    await ctx.reply("Ism, familyangizni kiriting?");
};

bot.command("start", (ctx) => {
    const keyboard = {
        keyboard: [
            [{ text: "Sherik kerak" }, { text: "Ish joyi kerak" }],
            [{ text: "Hodim kerak" }, { text: "Ustoz kerak" }],
            [{ text: "Shogird kerak" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
    };
    ctx.reply("Salom! Tanlovingizni qilishingiz mumkin.", {
        reply_markup: keyboard,
    });
});
[
    "Sherik kerak",
    "Ish joyi kerak",
    "Hodim kerak",
    "Ustoz kerak",
    "Shogird kerak",
].forEach((type) => {
    bot.hears(type, async (ctx) => startFlow(ctx, type));
});

bot.on("message", async (ctx) => {
    const userId = ctx.chat.id;
    const userMessage = ctx.message?.text;

    if (!userSteps[userId]) {
        ctx.reply("Iltimos, /start tugmasini bosib qayta urinib ko'ring.");
        return;
    }

    const { step, type } = userSteps[userId];

    switch (step) {
        case "name":
            userSteps[userId].name = userMessage;
            userSteps[userId].step = "technology";
            ctx.reply(
                "📚 Texnologiya:\n\nTalab qilinadigan texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating.\nMasalan, Java, C++, C#"
            );
            break;
        case "technology":
            userSteps[userId].technology = userMessage;
            userSteps[userId].step = "phone";
            ctx.reply(
                "📞 Aloqa:\n\nBog`lanish uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67"
            );
            break;
        case "phone":
            userSteps[userId].phone = userMessage;
            userSteps[userId].step = "region";
            ctx.reply(
                "🌐 Hudud:\n\nQaysi hududdansiz?\nViloyat nomi, Toshkent shahar yoki Respublikani kiriting."
            );
            break;
        case "region":
            userSteps[userId].region = userMessage;
            userSteps[userId].step = "price";
            ctx.reply(
                "💰 Narxi:\n\nTolov qilasizmi yoki Tekinmi?\nKerak bo`lsa, Summani kiriting?"
            );
            break;
        case "price":
            userSteps[userId].price = userMessage;
            userSteps[userId].step = "job";
            ctx.reply(
                "👨🏻‍💻 Kasbi:\n\nIshlaysizmi yoki o`qiysizmi?\nMasalan, Talaba"
            );
            break;
        case "job":
            userSteps[userId].job = userMessage;
            userSteps[userId].step = "time";
            ctx.reply(
                "🕰 Murojaat qilish vaqti:\n\nQaysi vaqtda murojaat qilish mumkin?\nMasalan, 9:00 - 18:00"
            );
            break;
        case "time":
            userSteps[userId].time = userMessage;

            const keyboard = {
                keyboard: [[{ text: "Ha" }, { text: "Yo'q" }]],
                resize_keyboard: true,
                one_time_keyboard: false,
            };

            // Prepare and display the final confirmation message
            await ctx.reply(
                `${type} uchun ariza:\n\n` +
                    `🏅 Ism: ${userSteps[userId].name}\n` +
                    `📚 Texnologiya: ${userSteps[userId].technology}\n` +
                    `🇺🇿 Telegram: @${ctx.from.username || "Noma'lum"}\n` +
                    `📞 Aloqa: ${userSteps[userId].phone}\n` +
                    `🌐 Hudud: ${userSteps[userId].region}\n` +
                    `💰 Narxi: ${userSteps[userId].price}\n` +
                    `👨🏻‍💻 Kasbi: ${userSteps[userId].job}\n` +
                    `🕰 Murojaat qilish vaqti: ${userSteps[userId].time}`,
                { reply_markup: keyboard }
            );
            userSteps[userId].step = "confirm";
            break;
        case "confirm":
            if (userMessage === "Ha") {
                await ctx.reply(
                    "📪 So`rovingiz tekshirish uchun adminga jo`natildi!\nE'lon 24-48 soat ichida kanalda chiqariladi.",
                    { reply_markup: menuButtons }
                );
            } else if (userMessage === "Yo'q") {
                await ctx.reply("So'rov bekor qilindi.", {
                    reply_markup: menuButtons,
                });
            }
            delete userSteps[userId];
            break;
        default:
            ctx.reply("Iltimos, /start buyrug'ini bosib qayta urinib ko'ring.");
            break;
    }
});
