import { Elysia } from "elysia";
import { authPlugin } from "../plugins/auth";
import { prisma } from "../lib/prisma";

export const cycleRoutes = new Elysia()
  .use(authPlugin)
  .get("/teams/:teamId/cycles", ({ params }) => prisma.cycle.findMany({ where: { teamId: (params as any).teamId }, orderBy: { startDate: "desc" } }))
  .post("/teams/:teamId/cycles", async ({ params, request }) => {
    const body = await request.json();
    return prisma.cycle.create({ data: { ...(body as any), teamId: (params as any).teamId } });
  })
  .patch("/cycles/:id", async ({ params, request }) => prisma.cycle.update({ where: { id: (params as any).id }, data: await request.json() }))
  .delete("/cycles/:id", ({ params }) => prisma.cycle.delete({ where: { id: (params as any).id } }));

