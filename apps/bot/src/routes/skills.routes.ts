import { Router } from "express";
import { SkillController } from "../controller/skill.controller";

const router = Router();
const controller = new SkillController();
router
  .post("/", controller.create)
  .get("/", controller.getAllSkills)
  .get("/:id", controller.getSkillById)
  .patch("/:id", controller.updateSkill)
  .delete("/:id", controller.deleteSkill);
export default router;