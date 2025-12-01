import type { MyContext, SessionData } from "./types/context.types";
import { buttons, EmitterBot } from "./bot.emit/bot.emit";
import { cvKeyboard } from "./keybords/bot.keyboards";
import { BotCommands } from "./commands/bot.commands";
import projectRouter from "./routes/project.routes";
import experRouter from "./routes/experien.routes";
import eduRouter from "./routes/education.routes";
import skillsRouter from "./routes/skills.routes";
import { CheckUser } from "./guards/user.check";
import userRouter from "./routes/user.routes";
import { prisma } from "../prisma/lib/prisma";
import cookieParser from "cookie-parser";
import pdfRouter from "./routes/pdf.save.routes";
import helmet from "helmet";
import express from "express";
import { Bot, session } from "grammy";
import cors from "cors";
import path from "path";

async function main() {
  const app = express();
  // app.use(
  //   helmet.contentSecurityPolicy({
  //     useDefaults: true,
  //     directives: {
  //       defaultSrc: ["'self'"],
  //       scriptSrc: [
  //         "'self'",
  //         "'unsafe-eval'",
  //         "'wasm-unsafe-eval'",
  //         "https://telegram.org",
  //         "https://t.me",
  //       ],
  //       styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  //       imgSrc: [
  //         "'self'",
  //         "data:",
  //         "https://ngrok.com",
  //         "https://t.me",
  //         "https://telegram.org",
  //       ],
  //       connectSrc: [
  //         "'self'",
  //         "http://localhost:4000",
  //         "wss:",
  //         "https://api.telegram.org",
  //       ],
  //       fontSrc: ["'self'", "data:", "blob:", "https://fonts.gstatic.com"],
  //       workerSrc: ["'self'", "blob:"],
  //       frameAncestors: ["'self'", "https://*.telegram.org", "https://*.t.me"],
  //       baseUri: ["'self'"],
  //     },
  //   })
  // );

  // app.use(express.static("public"));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  const port = process.env.PORT || 4000;

  // Express routes
  app.use("/api/user", userRouter);
  app.use("/api/upload-cv", pdfRouter);
  app.use("/api/project", projectRouter);
  app.use("/api/education", eduRouter);
  app.use("/api/skills", skillsRouter);
  app.use("/api/experien", experRouter);
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  app.listen(port, () => console.log("Server running on port:", port));

  // Telegram bot
  const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);

  // 1️⃣ WebApp sendData listener — eng yuqorida
 
  // 2️⃣ Contact message (WebAppga aloqasi yo‘q)
  bot.on("message:contact", async (ctx) => {
    const contact = ctx.message.contact;

    await prisma.user.update({
      where: { userId: ctx.from.id.toString() },
      data: { phone: contact.phone_number },
    });

    await ctx.reply("Pastdagi tugmalarni bosib ma'lumotlarni to‘ldiring....", {
      reply_markup: await cvKeyboard(),
    });
  });

  // 3️⃣ Middlewarelar
  bot.use(CheckUser);
  bot.use(
    session({
      initial: (): SessionData => ({
        mode: null,
        skills: [],
        aboutme: [],
        projects: [],
        educations: [],
        experience: [],

        currentDescription: null,
        currentSkill: null,
        currentProjects: null,
        currentEdu: null,
        currentExperience: null,
      }),
    })
  );
  // 4️⃣ Commands
  await BotCommands(bot);

  // 5️⃣ Emitters
  await EmitterBot(bot);

  // 6️⃣ Buttons
  await buttons(bot);

  // 7️⃣ Botni ishga tushirish
  bot.start();
  console.log("Bot running...");
}

main().catch((err) => console.error(err));
