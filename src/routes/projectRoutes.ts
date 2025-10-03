import { Elysia } from "elysia";
import { createProject, deleteProject, getProject, listProjects, updateProject } from "../controllers/projectController";
import { authPlugin } from "../plugins/auth";
import { CreateProjectSchema, UpdateProjectSchema } from "../lib/validation";

export const projectRoutes = new Elysia()
  .use(authPlugin)
  .get("/projects", () => listProjects())
  .post("/projects", async ({ request, set }) => {
    const body = await request.json();
    const parsed = CreateProjectSchema.safeParse(body);
    if (!parsed.success) {
      set.status = 400;
      return { ok: false, error: { message: parsed.error.message } };
    }
    return createProject(parsed.data);
  })
  .get("/projects/:id", ({ params }) => getProject({ id: (params as any).id }))
  .patch("/projects/:id", async ({ params, request, set }) => {
    const body = await request.json();
    const parsed = UpdateProjectSchema.safeParse(body);
    if (!parsed.success) {
      set.status = 400;
      return { ok: false, error: { message: parsed.error.message } };
    }
    return updateProject({ id: (params as any).id }, parsed.data);
  })
  .delete("/projects/:id", ({ params }) => deleteProject({ id: (params as any).id }));


