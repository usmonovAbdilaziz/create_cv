import type { Context } from "grammy";
import type { SessionFlavor } from "grammy";
import type { Education, Experience, Project, Skill } from "../../generated/prisma/client";

// Define the session data structure
export interface SessionData {
  mode: "skills" | "educations" | "projects" | "experience" | null;
  skills: never[];
  educations: never[];
  projects: never[];
  experience: never[];
  currentSkill: Skill | null;
  currentProjects: Project | null;
  currentEdu: Education | null;
  currentExperience: Experience | null;
}

// Create the context type with session
export type MyContext = Context & SessionFlavor<SessionData>;
