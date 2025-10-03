import { Elysia } from "elysia";
import { authPlugin } from "../plugins/auth";
import { createTeam, deleteTeam, listTeams, updateTeam } from "../controllers/teamController";

export const teamRoutes = new Elysia()
  .use(authPlugin)
  .get("/teams", () => listTeams())
  .post("/teams", async ({ request }) => createTeam(await request.json() as any))
  .patch("/teams/:id", async ({ params, request }) => updateTeam({ id: (params as any).id }, await request.json()))
  .delete("/teams/:id", ({ params }) => deleteTeam({ id: (params as any).id }));
