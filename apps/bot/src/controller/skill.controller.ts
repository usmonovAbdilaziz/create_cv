import type { Request, Response } from "express";
import { prisma } from "../../prisma/lib/prisma";
import { errorMessage, successMessage } from "../utils/response";

export class SkillController {
  async create(req: Request, res: Response) {
    try {
      const { userId, name, level } = req.body;
      const user = await prisma.user.findUnique({
        where: { userId: String(userId) },
      });
      if (!user) {
        return errorMessage(res, "User not found", 404);
      }
      if (!name || !level) {
        return errorMessage(res, "Missing required fields: name, level", 400);
      }
      const exists = await prisma.skill.findFirst({
        where: { name: String(name) },
      });
      if (exists) {
        return errorMessage(res, "Skill already exists", 400);
      }
      const skill = await prisma.skill.create({
        data: {
          name,
          level,
          user: {
            connect: { userId: String(userId) },
          },
        },
      });
      return successMessage(res, skill, 201);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async getAllSkills(req: Request, res: Response) {
    try {
      const skills = await prisma.skill.findMany();
      return successMessage(res, skills);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async getSkillById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const skill = await prisma.skill.findUnique({
        where: { id: Number(id) },
      });
      if (!skill) {
        return errorMessage(res, "Skill not found", 404);
      }
      return successMessage(res, skill);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async updateSkill(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const skill = await prisma.skill.findUnique({
        where: { id: Number(id) },
      });
      if (!skill) {
        return errorMessage(res, "Skill not found", 404);
      }
      const updatedSkill = await prisma.skill.update({
        where: { id: Number(id) },
        data: req.body,
      });
      return successMessage(res, updatedSkill, 201);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async deleteSkill(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const skill = await prisma.skill.findUnique({
        where: { id: Number(id) },
      });
      if (!skill) {
        return errorMessage(res, "Skill not found", 404);
      }
      await prisma.skill.delete({ where: { id: Number(id) } });
      return successMessage(res, "Skill deleted successfully");
    } catch (error) {
      return errorMessage(res, error);
    }
  }
}
