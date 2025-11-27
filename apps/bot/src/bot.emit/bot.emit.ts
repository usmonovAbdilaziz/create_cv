import { prisma } from "../../prisma/lib/prisma";
import {
  cvKeyboard,
  keyboard,
  KeyboardOnce,
  keyboards,
} from "../keybords/bot.keyboards";
const url = process.env.WEB_URL!;
export const EmitterBot = async (bot: any) => {
  bot.on("message:text", async (ctx: any) => {
    const message = ctx.message.text;
    const userId = ctx.from.id.toString();

    // === COMMAND MODES ===
    if (message === "/skills") {
      ctx.session.mode = "skills";
      ctx.session.currentSkill = null;
      return ctx.reply("Skill nomini kiriting:", { reply_markup: keyboards() });
    }

    if (message === "/projects") {
      ctx.session.mode = "projects";
      ctx.session.currentProjects = null;

      const list = await prisma.project.findMany({ where: { userId } });

      return ctx.reply(
        `Proyekt nomini kiriting:\n\n${list
          .map((p, i) => `${i + 1}. ${p.name}`)
          .join("\n")}`,
        {
          reply_markup:
            list.length === 0
              ? { remove_keyboard: true }
              : keyboard("projects"),
        }
      );
    }

    if (message === "/educations") {
      ctx.session.mode = "educations";
      ctx.session.currentEdu = null;

      const list = await prisma.education.findMany({ where: { userId } });

      return ctx.reply(
        `O‘quv muassasa turini kiriting... \nMasalan:  (Universitet, Kollej, yoki O‘quv markaz nomi)\n\n${list
          .map((e, i) => `${i + 1}. ${e.title}`)
          .join("\n")}`,
        {
          reply_markup:
            list.length === 0
              ? { remove_keyboard: true }
              : keyboard("education"),
        }
      );
    }

    if (message === "/experience") {
      ctx.session.mode = "experience";
      ctx.session.currentExperience = null;

      const list = await prisma.experience.findMany({ where: { userId } });

      return ctx.reply(
        `Ishlagan kompaniya nomini kiriting:\n\n${list
          .map((e, i) => `${i + 1}. ${e.company}`)
          .join("\n")}`,
        {
          reply_markup:
            list.length === 0
              ? { remove_keyboard: true }
              : keyboard("experience"),
        }
      );
    }

    // === MODE OPERATIONS ===
    switch (ctx.session.mode) {
      // ================= SKILLS =================
      case "skills":
        if (!ctx.session.currentSkill) {
          ctx.session.currentSkill = { name: "", level: "" };
        }

        const skill = ctx.session.currentSkill;

        if (!skill.name) {
          skill.name = message;
          return ctx.reply(
            `${skill.name} bo‘yicha darajangizni kiriting (Beginner/Intermediate/Advanced/Expert)`
          );
        }

        skill.level = message;

        await prisma.skill.create({
          data: { userId, name: skill.name, level: skill.level },
        });

        ctx.session.currentSkill = null;
        ctx.session.skills = [];

        return ctx.reply("✅ Skill saqlandi", {
          reply_markup: cvKeyboard(),
        });

      // ================= PROJECTS =================
      case "projects":
        if (!ctx.session.currentProjects) {
          ctx.session.currentProjects = { name: "", link: "", description: "" };
        }

        const proj = ctx.session.currentProjects;

        if (!proj.name) {
          proj.name = message;
          return ctx.reply(`"${proj.name}" linkini kiriting:`);
        }

        if (!proj.link) {
          proj.link = message;
          return ctx.reply(`"${proj.name}" tavsifini kiriting:`);
        }

        if (!proj.description) {
          proj.description = message;

          await prisma.project.create({
            data: {
              userId,
              name: proj.name,
              link: proj.link,
              description: proj.description,
            },
          });

          ctx.session.currentProjects = null;
          ctx.session.projects = [];

          return ctx.reply("Project qo‘shildi", {
            reply_markup: cvKeyboard(),
          });
        }

        break;

      // ================= EDUCATION =================
      case "educations":
        if (!ctx.session.currentEdu) {
          ctx.session.currentEdu = {
            title: "",
            school: "",
            year: "",
            position: "",
            level: "",
          };
        }

        const edu = ctx.session.currentEdu;

        if (!edu.title) {
          edu.title = message;
          return ctx.reply(`O‘qish joyingiz nomini kiriting...`);
        }

        if (!edu.school) {
          edu.school = message;
          return ctx.reply(
            `O‘qigan yillaringizni kiriting (masalan: 2020-2024):`
          );
        }

        if (!edu.year) {
          edu.year = message;
          return ctx.reply(`Mutaxassisligingizni kiriting...`);
        }

        if (!edu.position) {
          edu.position = message;
          return ctx.reply(
            `Ta'lim darajangiz (Bakalavr, Magistr...)\n\n"Uquv markaz bulsa tuldirish shart emas"`
          );
        }

        edu.level = message;

        await prisma.education.create({
          data: { ...edu, userId },
        });

        ctx.session.currentEdu = null;
        ctx.session.educations = [];

        return ctx.reply("Education qo‘shildi", {
          reply_markup: cvKeyboard(),
        });

      // ================= EXPERIENCE =================
      case "experience":
        if (!ctx.session.currentExperience) {
          ctx.session.currentExperience = {
            company: "",
            duration: "",
            description: "",
          };
        }

        const exp = ctx.session.currentExperience;

        if (!exp.company) {
          exp.company = message;
          return ctx.reply(`"${exp.company}"da qancha ishlagansiz?`);
        }

        if (!exp.duration) {
          exp.duration = message;
          return ctx.reply(
            `Qaysi natijalarni qo‘lga kiritdingiz? (Result/Impact):`
          );
        }

        exp.description = message;

        const { data } = (await prisma.experience.create({
          data: { ...exp, userId },
        })) as any;

        ctx.session.currentExperience = null;
        ctx.session.experience = [];
        return ctx.reply("Experience qo‘shildi", {
          reply_markup: cvKeyboard(),
        });
    }
  });
};

export const buttons = async (bot: any) => {
  bot.callbackQuery(/^remove_(.+)$/, async (ctx: any) => {
    const type = ctx.match[1]; // skills yoki projects
    const userId = ctx.from.id.toString();
    if (type === "skills") {
      await prisma.skill.deleteMany({
        where: {
          userId,
        },
      });
      await ctx.answerCallbackQuery("Skills malumotlari Tozalandi");
      await ctx.reply(
        "Malumotlar tozalandi, Pastdagi tugmalardan birini bosib amaliyotni davom ettiring",
        { reply_markup: cvKeyboard() }
      );
      return;
    }
    if (type === "projects") {
      await prisma.project.deleteMany({
        where: {
          userId,
        },
      });
      await ctx.answerCallbackQuery("Projects malumotlari Tozalandi");
      await ctx.reply(
        "Malumotlar tozalandi, Pastdagi tugmalardan birini bosib amaliyotni davom ettiring",
        { reply_markup: cvKeyboard() }
      );
      return;
    }
    if (type === "experience") {
      await prisma.experience.deleteMany({
        where: {
          userId,
        },
      });
      await ctx.answerCallbackQuery("Experience malumotlari Tozalandi");
      await ctx.reply(
        "Malumotlar tozalandi, Pastdagi tugmalardan birini bosib amaliyotni davom ettiring",
        { reply_markup: cvKeyboard() }
      );
      return;
    }
    if (type === "education") {
      await prisma.education.deleteMany({
        where: {
          userId,
        },
      });
      await ctx.answerCallbackQuery("Projects malumotlari Tozalandi");
      await ctx.reply(
        "Malumotlar tozalandi, Pastdagi tugmalardan birini bosib amaliyotni davom ettiring",
        { reply_markup: cvKeyboard() }
      );
      return;
    }
  });
  bot.callbackQuery("stop", async (ctx: any) => {
    ctx.session.mode = null; // Skills bo‘limini yopish
    await ctx.answerCallbackQuery("Tugatish tanlandi");
    await ctx.reply("Tugatildi pastdagilardan birini tanlang", {
      reply_markup: cvKeyboard(),
    });
  });
  bot.callbackQuery("newResume", async (ctx: any) => {
    await ctx.answerCallbackQuery("New Resume tanlandi!");
    ctx.session.mode = null;
    await prisma.skill.deleteMany({
      where: { userId: ctx.from.id.toString() },
    });
    await prisma.project.deleteMany({
      where: { userId: ctx.from.id.toString() },
    });
    await prisma.experience.deleteMany({
      where: { userId: ctx.from.id.toString() },
    });
    await prisma.education.deleteMany({
      where: { userId: ctx.from.id.toString() },
    });
    await ctx.reply("Pastdagi tugmalardan birini tanlab jarayonni boshlang", {
      reply_markup: cvKeyboard(),
    });
  });

  bot.callbackQuery("aboutme", async (ctx: any) => {
    const user = await prisma.user.findUnique({
      where: { userId: ctx.from.id.toString() },
      include: {
        skills: true,
        projects: true,
        experiences: true,
        educations: true,
      },
    });
    await ctx.reply(
      "Bu CV yaratish boti siz bu yerda o'zingizni malumotlaringizni kiritasiz va web dan cv kurinishini tanlaysiz tayyor cv ni .pdf shakilda olasiz..."
    );
    if (user) {
      if (
        user.skills.length !== 0 &&
        user.projects.length !== 0 &&
        user.experiences.length !== 0 &&
        user.educations.length !== 0
      ) {
        await ctx.reply(
          `Sizning malumotlaringiz.\nSkills\n ${user?.skills
            ?.map((skill, index) => `${index + 1}. ${skill.name}`)
            .join(",\n ")|| 'Malumotlar xali tuldirilmagan...'}`
        );
        await ctx.reply(
          `Projects\n ${
            user?.projects
              ?.map((project, index) => `${index + 1}. ${project.name}`)
              .join(",\n ") || "Malumotlar xali tuldirilmagan..."
          }`
        );
        await ctx.reply(
          `Experiences\n ${
            user?.experiences
              ?.map(
                (experience, index) => `${index + 1}. ${experience.company}`
              )
              .join(",\n ") || "Malumotlar xali tuldirilmagan..."
          }`
        );
        await ctx.reply(
          `Education\n ${
            user?.educations
              ?.map((education, index) => `${index + 1}. ${education.school}`)
              .join(",\n ") || "Malumotlar xali tuldirilmagan..."
          }`
        );
      }
      await ctx.reply("Ushbu malumotlar bilan cv yaratishingiz mumkin.", {
        reply_markup: KeyboardOnce(url),
      });
    } else {
      await ctx.reply(
        "Sizning malumotlaringiz bo'sh.Pastdagi tugmalardan birini tanlab jarayonni boshlang",
        { reply_markup: cvKeyboard() }
      );
    }
  });
};
