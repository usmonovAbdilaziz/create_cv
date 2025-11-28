import { existsSync, mkdirSync, writeFileSync } from "fs";
import multer from "multer";
import path from "path";

export const uploadPdf = multer({ storage: multer.memoryStorage() });

export const savePdf = async (file: any)=> {
  try {
    const uploadDir = path.resolve(__dirname, "..", "..", "uploads");

    // Papka mavjud bo‘lmasa → yaratish
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // Fayl nomi → illegal belgilarni olib tashlash
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `${timestamp}_${file.originalname}`;

    const filePath = path.join(uploadDir, fileName);

    // Fayl mavjudligini tekshirish
    if (existsSync(filePath)) {
      console.log("File already exists:", filePath);
      return{ filePath}; // yoki xatolik qaytarish mumkin
    }

    // Bufferni faylga yozish
    writeFileSync(filePath, file.buffer);

    // Faylning to‘liq path’ini qaytarish
    return { path: filePath, name: fileName };
  } catch (error) {
    console.error("File save error:", error);
  }
};

