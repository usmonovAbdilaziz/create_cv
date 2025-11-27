import { Router } from "express";
import { UserController } from "../controller/user.controller";

const controller = new UserController();

const router = Router();
router
  .get("/", controller.getAll)
  .get("/:id", controller.getOne)
  .delete("/:id", controller.deleteUser);

export default router;
