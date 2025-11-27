import { prisma } from "../../prisma/lib/prisma";
import { Keyboard } from "grammy";
import { KeyboardOnce } from "../keybords/bot.keyboards";
import { config } from "dotenv";
import type { MyContext } from "../types/context.types";
config();

const keyboard = new Keyboard().requestContact("📱 Raqamni ulashish").resized();
export const CheckUser = async (ctx: MyContext, next: () => Promise<void>) => {
  try {
    const userId = ctx.from!.id.toString();
    const existsUser = await prisma.user.findUnique({ where: { userId } });
    if (!existsUser) {
      await prisma.user.create({
        data: {
          userId,
          name: ctx.from?.first_name + " " + (ctx.from?.last_name || ""),
          username: ctx.from?.username || "",
          phone: "",
        },
      });
    } else if (!existsUser.phone) {
      ctx.reply(
        "Botdan tuliq foydalanish uchun iltimos telefon raqamingizni yuboring.",
        {
          reply_markup: keyboard,
        }
      );
      return;
    }
    // ctx.reply("Saytga utishingiz mumkin", {
    //   reply_markup: KeyboardOnce(String(process.env.WEB_URL)),
    // });
    return next();
  } catch (error) {
    console.log("Checkening user error: ", error);
  }
};
