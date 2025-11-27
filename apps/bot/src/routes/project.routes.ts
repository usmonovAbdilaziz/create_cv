import { Router } from "express";
import { ProjectController } from "../controller/project.controller";

const router = Router();
const controller = new ProjectController();

router
  .post("/", controller.create)
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .patch("/:id", controller.update)
  .delete("/:id", controller.delete);
export default router;