import { Router } from "express";
import { ExperienceController } from "../controller/experiense.controller";
const controller = new ExperienceController();
const router = Router();

router
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .post("/", controller.create)
  .patch("/:id", controller.update)
  .delete("/:id", controller.delete);

export default router;
