import { Elysia } from "elysia";
import { createProject, deleteProject, getProject, listProjects, updateProject } from "../controllers/projectController";
import { authPlugin } from "../plugins/auth";

export const projectRoutes = new Elysia()
  .use(authPlugin)
  .get("/projects", () => listProjects())
  .post("/projects", async ({ request }) => createProject(await request.json()))
  .get("/projects/:id", ({ params }) => getProject({ id: (params as any).id }))
  .patch("/projects/:id", async ({ params, request }) => updateProject({ id: (params as any).id }, await request.json()))
  .delete("/projects/:id", ({ params }) => deleteProject({ id: (params as any).id }));


