import { KeyboardOnce, removeKeyboard } from "./keybords/bot.keyboards";
import { BotCommands } from "./commands/bot.commands";
import projectRouter from "./routes/project.routes";
import experRouter from "./routes/experien.routes";
import eduRouter from "./routes/education.routes";
import skillsRouter from "./routes/skills.routes";
import { CheckUser } from "./guards/user.check";
import userRouter from "./routes/user.routes";
import { prisma } from "../prisma/lib/prisma";
import cookieParser from "cookie-parser";
import express from "express";
import { Bot, session } from "grammy";
import cors from "cors";
import type { MyContext, SessionData } from "./types/context.types";
import { buttons, EmitterBot } from "./bot.emit/bot.emit";

async function main() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  const port = process.env.PORT || 4000;

  // Express routes
  app.use("/user", userRouter);
  app.use("/education", eduRouter);
  app.use("/skills", skillsRouter);
  app.use("/experien", experRouter);
  app.use("/project", projectRouter);
  app.listen(port, () => console.log("Server running on port:", port));

  // Telegram bot
  const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);

  bot.on("message:contact", async (ctx) => {
    const contact = ctx.message.contact;

    await prisma.user.update({
      where: { userId: ctx.from.id.toString() },
      data: { phone: contact.phone_number },
    });
    await ctx.reply("Premium start...", {
      reply_markup: removeKeyboard(),
    });
    // await ctx.reply(`Pastdagi tugmani bosib saytga kiring`, {
    //   reply_markup: KeyboardOnce(process.env.WEB_URL!),
    // });
  });

  // Middleware
  bot.use(CheckUser);
  bot.use(
    session({
      initial: (): SessionData => ({
        mode: null,

        skills: [],
        projects: [],
        educations: [],
        experience: [],

        currentSkill: null,
        currentProjects: null,
        currentEdu: null,
        currentExperience: null,
      }),
    })
  );
  

  // Commands
  await BotCommands(bot);
  await EmitterBot(bot);
  await buttons(bot);

  bot.start();
  console.log("Bot running...");
}

main().catch((err) => console.error(err));
