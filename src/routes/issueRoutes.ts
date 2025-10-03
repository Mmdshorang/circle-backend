import { Elysia } from "elysia";
import { authPlugin } from "../plugins/auth";
import { createIssue, deleteIssue, getIssue, listIssues, updateIssue } from "../controllers/issueController";
import { CreateIssueSchema, UpdateIssueSchema, ListIssuesQuerySchema } from "../lib/validation";

export const issueRoutes = new Elysia()
  .use(authPlugin)
  .get("/issues", ({ query, set }) => {
    const parsed = ListIssuesQuerySchema.safeParse(query);
    if (!parsed.success) {
      set.status = 400;
      return { ok: false, error: { message: parsed.error.message } };
    }
    return listIssues(parsed.data);
  })
  .get("/issues/:id", ({ params }) => getIssue({ id: (params as any).id }))
  .post("/issues", async ({ request, set }) => {
    const body = await request.json();
    const parsed = CreateIssueSchema.safeParse(body);
    if (!parsed.success) {
      set.status = 400;
      return { ok: false, error: { message: parsed.error.message } };
    }
    return createIssue(parsed.data);
  })
  .patch("/issues/:id", async ({ params, request, set }) => {
    const body = await request.json();
    const parsed = UpdateIssueSchema.safeParse(body);
    if (!parsed.success) {
      set.status = 400;
      return { ok: false, error: { message: parsed.error.message } };
    }
    return updateIssue({ id: (params as any).id }, parsed.data);
  })
  .delete("/issues/:id", ({ params }) => deleteIssue({ id: (params as any).id }));


