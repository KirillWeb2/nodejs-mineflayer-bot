import {createInterface} from "readline";
import bot from "./bot";
import "./captha/captha"

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const state = {
    isAuth: false,
    user: process.argv[2] ? process.argv[2] : "Admin",
    isMooving: false,
    nowFishing: false,
    password: "password",
    attack: false,
};

bot.on("spawn", async () => {
    try {
        console.log("Бот заспавнился");
        setTimeout(() => bot.activateItem(), 2000);
    } catch (error) {
        console.log(error);
    }
});


bot.on("windowOpen", async (window) => {
    try {
        const title = JSON.parse(window.title).text

        if (title === "Выберите режим:") {
            const slots = window.slots.filter((i) => i && i.name === "player_head");

            rl.question("Введите номер режима: ", async (asw) => {
                if (Number(asw) > slots.length + 1) {
                    console.log("В этом слоту нет режима, попробуйте снова");
                    await bot.closeWindow(window);
                    setTimeout(() => bot.activateItem(), 2500);
                    return;
                }

                bot.clickWindow(slots[Number(asw) - 1].slot, 1, 0);
            });
        }

        if (title.search(/['спидран', 'гриф', 'классич']/gi)) {
            const slots = window.slots.filter((i) => i && i.name === "player_head");

            rl.question("Введите номер сервера: ", async (asw) => {
                if (Number(asw) > slots.length + 1) {
                    console.log("В этом слоту нет сервера, попробуйте снова");
                    await bot.closeWindow(window);
                    setTimeout(() => bot.activateItem(), 2500);
                    return;
                }

                await bot.clickWindow(slots[Number(asw) - 1].slot, 1, 0);
            });
        }
    } catch (error) {
        console.log(error);
    }
});

bot.on("message", async (chatMessage) => {
    try {
        if (chatMessage.toString().includes("/login")) {
            await bot.chat(`/login ${state.password}`);
        }

        if (chatMessage.toString().includes("/register")) {
            await bot.chat(`/register ${state.password} ${state.password}`);
        }
    } catch (error) {
        console.log(error);
    }
});
