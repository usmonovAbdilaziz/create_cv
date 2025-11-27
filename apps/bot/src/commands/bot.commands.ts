import type { Bot } from "grammy";
import type { MyContext } from "../types/context.types";
import { prisma } from "../../prisma/lib/prisma";
import { cvKeyboard, keyboard, removeKeyboard } from "../keybords/bot.keyboards";

export const BotCommands = async (bot: Bot<MyContext>) => {
  bot.command("start", (ctx) => {
    ctx.reply("Salom botga xush kelibsiz, Quyidagilardan birini tanlang...\nEslatma: `New Resume` ni tanlasangiz barcha malumotlaringiz uchiriladi. ", {
      reply_markup: removeKeyboard(),
    });
  });
  bot.command('help',(ctx:any)=>{
    ctx.reply("/start - Botni ishga tushirish",{
      reply_markup: removeKeyboard(),
    })
  })
  bot.command("skills", async (ctx) => {
    ctx.session.mode = "skills";
    const id = ctx.from!.id.toString();

    const skills = await prisma.skill.findMany({ where: { userId: id } });

    ctx.reply(
      "🧠 *Skills bo‘limi*\n\n" +
      "Kasbiy maxoratingizni quyidagi misoldagidek kiriting:\n" +
      "JavaScript,Nodejs\n" +
        `${
          skills.length === 0
            ? ""
            : `Maxoratingiz ruyxati...\n ${skills.map((skill) => {
                return `\nNomi: ${skill.name} \nDarajasi: ${skill.level}`;
              })}`
        }`,
      {
        reply_markup:
          skills.length === 0 ? { remove_keyboard: true } : keyboard("skills"),
      }
    );
  });
  bot.command("info",async(ctx:any)=>{
    const userId = ctx.from.id.toString();
    const user = await prisma.user.findUnique({ where: { userId }, include: { skills: true, projects: true, experiences: true, educations: true } });
    await ctx.reply(`Sizning mahoratingiz...\n${user?.skills?.map((skill, index) => `${index + 1}. ${skill.name}`).join(", ") || "Malumotlar xali tuldirilmagan"}`)
    await ctx.reply(`Sizning loyihalaringiz...\n${user?.projects?.map((project, index) => `${index + 1}. ${project.name}`).join(", ") || "Malumotlar xali tuldirilmagan"}`)
    await ctx.reply(`Sizning tajribangiz...\n${user?.experiences?.map((experience, index) => `${index + 1}. ${experience.company}`).join(", ") || "Malumotlar xali tuldirilmagan"}`)
    await ctx.reply(`Sizning uqigan joylaringiz...\n${user?.educations?.map((education, index) => `${index + 1}. ${education.school}`).join(", ") || "Malumotlar xali tuldirilmagan"}`)
   if(user){
    if( user.skills.length > 0 || user.projects.length > 0 || user.experiences.length > 0 || user.educations.length > 0)
    {
    return ctx.reply('Davom ettirish uchun pastdagi tugmalardan birini tanlang...', { reply_markup: cvKeyboard() })
    }
  }
  })
//   bot.command("education", (ctx) => {
//     ctx.session.mode = "educations";
//     ctx.reply(
//       "📚 *Education bo‘limi*\n\n" +
//         "Quyidagi misoldagidek yozing:\n" +
//         "`2020-2021, BSUIR, Bachelor`\n" +
//         "Yakunlash uchun /done ni yuboring."
//     );
//   });
//   bot.command("project", (ctx) => {
//     ctx.session.mode = "projects";
//     ctx.reply(
//       "💻 *Projects bo‘limi*\n\n" +
//         "Quyidagi misoldagidek yozing:\n" +
//         "`2020-2021, BSUIR, Bachelor`\n" +
//         "Yakunlash uchun /done ni yuboring."
//     );
//   });
//   bot.command("experience", (ctx) => {
//     ctx.session.mode = "experience";
//     ctx.reply(
//       "👨‍💻 *Experience bo‘limi*\n\n" +
//         "Quyidagi misoldagidek yozing:\n" +
//         "`2020-2021, BSUIR, Bachelor`\n" +
//         "Yakunlash uchun /done ni yuboring."
//     );
//   });
};
