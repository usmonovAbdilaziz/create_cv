import type { Request, Response } from "express";
import { prisma } from "../../prisma/lib/prisma";
import { errorMessage, successMessage } from "../utils/response";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        include: {
          skills: true,
          experiences: true,
          educations: true,
          projects: true,
        },
      });
      return successMessage(res, users);
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const user = await prisma.user.findUnique({ where: { userId: id } });
      if (!user) {
        return errorMessage(res, "User not found", 404);
      }
      const payload = {
        userId: id,
        name: user.name,
      };
      const token = await generateAccessToken(payload);
      const refresh = await generateRefreshToken(payload);
      res.cookie("refreshToken", refresh, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 2 * 24 * 60 * 60 * 1000,
      });
      return successMessage(res, { user, token });
    } catch (error) {
      return errorMessage(res, error);
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) {
        return errorMessage(res, "User ID is required", 400);
      }
      const user = await prisma.user.findUnique({ where: { userId: id } });
      if (!user) {
        return errorMessage(res, "User not found", 404);
      }
      const deletedUser = await prisma.user.delete({ where: { userId: id } });
      return successMessage(res, deletedUser);
    } catch (error: any) {
      if (error.code === "P2025") {
        return errorMessage(res, "User not found", 404);
      }
      return errorMessage(res, error);
    }
  }
}
