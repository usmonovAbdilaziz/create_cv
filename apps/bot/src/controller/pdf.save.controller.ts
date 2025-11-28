import type { Request, Response } from "express";
import { savePdf } from "../utils/upload.file";
import { errorMessage, successMessage } from "../utils/response";
import { prisma } from "../../prisma/lib/prisma";
import fs from 'fs'

export class PdfSaveController {
  async createPdf(req: Request, res: Response) {
    try {
      const {userId} = (req.body);      
      const formatFile = req.file;
      const fileType = formatFile?.mimetype.split("/")[1];
      if (fileType === "pdf") {
        const { path, name } = (await savePdf(formatFile)) as any;
        const newFile = await prisma.pdfHistory.create({
          data: {
            fileName: name,
            filePath: path,
            user: { connect: { userId: String(userId) } },
          },
        });
        return successMessage(res,newFile,201)
      } else {
        return errorMessage(res, "File notug'ri formatda", 400);
      }
    } catch (error) {
      return errorMessage(res,error);
    }
  }
  async downloadPdf (req:Request,res:Response){
    try {
        const fileName=req.params
        console.log(fileName);
        
        const pdfFile = await prisma.pdfHistory.findFirst({where:{fileName}})
        if(!pdfFile){
            return errorMessage(res,'File not found',404)
        }
        if (!fs.existsSync(pdfFile.filePath)) {
          return errorMessage(res, "Path not found", 404);
        }
        // return res.download(pdfFile.filePath, fileName, (err) => {
        //   if (err) {
        //     console.log("Yuklab olishda xatolik", err);
        //   }
        // });
    } catch (error) {
      return errorMessage(res,error)  
    }
  }
}
