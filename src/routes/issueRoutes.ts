import { Elysia } from "elysia";
import { authPlugin } from "../plugins/auth";
import { createIssue, deleteIssue, listIssues, updateIssue } from "../controllers/issueController";

export const issueRoutes = new Elysia()
  .use(authPlugin)
  .get("/issues", ({ query }) => listIssues({ projectId: (query as any)?.projectId, cycleId: (query as any)?.cycleId }))
  .post("/issues", async ({ request }) => createIssue(await request.json()))
  .patch("/issues/:id", async ({ params, request }) => updateIssue({ id: (params as any).id }, await request.json()))
  .delete("/issues/:id", ({ params }) => deleteIssue({ id: (params as any).id }));


