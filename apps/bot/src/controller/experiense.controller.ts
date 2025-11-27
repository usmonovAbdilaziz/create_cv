import type { Request, Response } from "express";
import { prisma } from "../../prisma/lib/prisma";
import { errorMessage, successMessage } from "../utils/response";

export class ExperienceController {
  async getAll(req: Request, res: Response) {
    try {
      const experiences = await prisma.experience.findMany();
      return successMessage(res, experiences);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const experience = await prisma.experience.findUnique({
        where: { id: Number(id) },
      });
      if (!experience) {
        return errorMessage(res, "Experience not found", 404);
      }
      return successMessage(res, experience);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { userId, description, company, duration } = req.body;
      const user = await prisma.user.findUnique({
        where: { userId: String(userId) },
      });
      if (!user) {
        return errorMessage(res, "User not found", 404);
      }
      if(!description || !company || !duration){
        return errorMessage(res, "Missing required fields: description, company, duration", 400);
      }
      const exists = await prisma.experience.findFirst({
        where: { company: String(company) },
      });
      if (exists) {
        return errorMessage(res, "Experience already exists", 400);
      }
      const experience = await prisma.experience.create({
        data: {
          company: String(company),
          duration: String(duration),
          description: String(description),
          user: {
            connect: { userId: String(userId) },
          },
        },
      });
      return successMessage(res, experience,201);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async update(req: Request, res: Response) { 
    try {
        const { id } = req.params;
        const exisperiens =await prisma.experience.findUnique({
            where: { id: Number(id) },
          });
          if(!exisperiens){
            return errorMessage(res, "Experience not found", 404);

          }
        const experience = await prisma.experience.update({
          where: { id: Number(id) },
          data: req.body,
        });
      return successMessage(res, experience);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async delete(req: Request, res: Response) { 
    try {
        const { id } = req.params;
        const exisperiens =await prisma.experience.findUnique({
            where: { id: Number(id) },
          });
          if(!exisperiens){
            return errorMessage(res, "Experience not found", 404);

          }
        const experience = await prisma.experience.delete({ where: { id: Number(id) } });
      return successMessage(res, experience);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
}
