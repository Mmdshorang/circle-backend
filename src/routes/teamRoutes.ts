import { Elysia } from "elysia";
import { authPlugin } from "../plugins/auth";
import { createTeam, deleteTeam, listTeams, updateTeam } from "../controllers/teamController";
import { CreateTeamSchema, UpdateTeamSchema } from "../lib/validation";

export const teamRoutes = new Elysia()
  .use(authPlugin)
  .get("/teams", () => listTeams())
  .post("/teams", async ({ request, set }) => {
    const body = await request.json();
    const parsed = CreateTeamSchema.safeParse(body);
    if (!parsed.success) {
      set.status = 400;
      return { ok: false, error: { message: parsed.error.message } };
    }
    return createTeam(parsed.data);
  })
  .patch("/teams/:id", async ({ params, request, set }) => {
    const body = await request.json();
    const parsed = UpdateTeamSchema.safeParse(body);
    if (!parsed.success) {
      set.status = 400;
      return { ok: false, error: { message: parsed.error.message } };
    }
    return updateTeam({ id: (params as any).id }, parsed.data);
  })
  .delete("/teams/:id", ({ params }) => deleteTeam({ id: (params as any).id }));
