import { Router } from "express";
import { EduController } from "../controller/education.controller";
const educationController = new EduController();
const router = Router();

router
  .post("/", educationController.createEdu)
  .get("/", educationController.getAllEdu)
  .get("/:id", educationController.getEduById)
  .patch("/:id", educationController.updateEdu)
  .delete("/:id", educationController.deleteEdu)

export default router;