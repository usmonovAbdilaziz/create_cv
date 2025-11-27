import type { Request, Response } from "express";
import { prisma } from "../../prisma/lib/prisma";
import { errorMessage, successMessage } from "../utils/response";

export class ProjectController {
  async create(req: Request, res: Response) {
    try {
      const { name, description, link, userId } = req.body;
      const exists = await prisma.project.findFirst({
        where: { name: String(name) },
      });
      if (exists) {
        return errorMessage(res, "Project already exists", 400);
      }
      const project = await prisma.project.create({
        data: {
          name,
          description,
          link,
          user: { connect: { userId: String(userId) } },
        },
      });
      return successMessage(res, project, 201);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const projects = await prisma.project.findMany();
      return successMessage(res, projects);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const project = await prisma.project.findUnique({
        where: { id: Number(id) },
      });
      if (!project) {
        return errorMessage(res, "Project not found", 404);
      }
      return successMessage(res, project);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, link, userId } = req.body;
      const project = await prisma.project.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          link,
          userId,
        },
      });
      return successMessage(res, project);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const exisproject = await prisma.project.findUnique({
        where: { id: Number(id) },
      });
      if (!exisproject) {
        return errorMessage(res, "Project not found", 404);
      }
      await prisma.project.delete({
        where: { id: Number(id) },
      });
      return successMessage(res, "Project deleted successfully");
    } catch (error) {
      return errorMessage(res, error);
    }
  }
}
