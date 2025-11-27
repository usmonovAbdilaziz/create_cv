import { InlineKeyboard, Keyboard } from "grammy";

export const KeyboardOnce = (urls: string) => {
  const keyboard = new InlineKeyboard().webApp("🌐 Vebsaytga o‘tish", urls);
  return keyboard;
};
export const keyboards = () => {
  const keyboard = new InlineKeyboard().text("Tugatish", "stop");
  return keyboard;
};
export const removeKeyboard = () => {
  const keyboard = new InlineKeyboard()
    .text("New Resume", "newResume")
    .text("Ma'lumotlar", "aboutme");
  return keyboard;
};
export const keyboard = (route: string) => {
  const keyboard = new InlineKeyboard().text(
    "Barchasini Tozalash",
    `remove_${route}`
  );
  return keyboard;
};
export const cvKeyboard = async () => {
  const keyboard = new Keyboard()
    .text("/skills")
    .text("/projects")
    .text("/educations")
    .text("/experience")
    .resized();
  return keyboard;
};
