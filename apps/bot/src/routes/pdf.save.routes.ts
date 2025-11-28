import { Router ,} from "express";
import { PdfSaveController } from "../controller/pdf.save.controller";
import { uploadPdf } from "../utils/upload.file";

const controller = new PdfSaveController()

const router = Router()

router
  .post("/", uploadPdf.single("file"), controller.createPdf)

export default router
