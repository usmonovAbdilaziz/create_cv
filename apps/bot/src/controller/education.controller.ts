import type { Request, Response } from "express";
import { prisma } from "../../prisma/lib/prisma";
import { errorMessage, successMessage } from "../utils/response";

export class EduController {
  // Create education
  async createEdu(req: Request, res: Response) {
    try {
      const { userId, title, school, year, position, level } = req.body;

      // Validate required fields
      if (!userId || !title || !school || !year || !position || !level) {
        return errorMessage(
          res,
          "Missing required fields: userId, title, school, year, position,level",
          400
        );
      }

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { userId: String(userId) },
      });
      if (!user) {
        return errorMessage(res, "User not found", 404);
      }
      const existsSchool = await prisma.education.findFirst({
        where: { school: String(school) },
      });
      if (existsSchool) {
        return errorMessage(res, "School already exists", 400);
      }
      // Create education record
      const newEdu = await prisma.education.create({
        data: {
          title: String(title),
          school: String(school),
          position: String(position),
          year: String(year),
          level: String(level) as "FINISHED" | "CONTINUE",
          user: {
            connect: { userId: String(userId) },
          },
        },
      });

      return successMessage(res, newEdu, 201);
    } catch (error) {
      return errorMessage(res, error);
    }
  }

  // Get all educations for a user
  async getAllEdu(req: Request, res: Response) {
    try {
      const educations = await prisma.education.findMany();
      return successMessage(res, educations);
    } catch (error) {
      return errorMessage(res, error);
    }
  }

  // Get one education by ID
  async getEduById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const eduId = Number(id);

      if (isNaN(eduId)) {
        return errorMessage(res, "Invalid education ID", 400);
      }

      const education = await prisma.education.findUnique({
        where: { id: eduId },
      });

      if (!education) {
        return errorMessage(res, "Education not found", 404);
      }

      return successMessage(res, education);
    } catch (error) {
      return errorMessage(res, error);
    }
  }

  // Update education by ID
  async updateEdu(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, school, year } = req.body;
      const eduId = Number(id);

      if (isNaN(eduId)) {
        return errorMessage(res, "Invalid education ID", 400);
      }

      // Check if education exists
      const existingEdu = await prisma.education.findUnique({
        where: { id: eduId },
      });

      if (!existingEdu) {
        return errorMessage(res, "Education not found", 404);
      }

      // Build update data object with only provided fields
      const updateData: any = {};
      if (title !== undefined) updateData.title = String(title);
      if (school !== undefined) updateData.school = String(school);
      if (year !== undefined) updateData.year = String(year);

      // Update education
      const updatedEdu = await prisma.education.update({
        where: { id: eduId },
        data: updateData,
      });

      return successMessage(res, updatedEdu);
    } catch (error: any) {
      if (error.code === "P2025") {
        return errorMessage(res, "Education not found", 404);
      }
      return errorMessage(res, error);
    }
  }

  // Delete education by ID
  async deleteEdu(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const eduId = Number(id);

      if (isNaN(eduId)) {
        return errorMessage(res, "Invalid education ID", 400);
      }

      // Check if education exists
      const existingEdu = await prisma.education.findUnique({
        where: { id: eduId },
      });

      if (!existingEdu) {
        return errorMessage(res, "Education not found", 404);
      }

      // Delete education
      const deletedEdu = await prisma.education.delete({
        where: { id: eduId },
      });

      return successMessage(res, deletedEdu);
    } catch (error: any) {
      if (error.code === "P2025") {
        return errorMessage(res, "Education not found", 404);
      }
      return errorMessage(res, error);
    }
  }
}
