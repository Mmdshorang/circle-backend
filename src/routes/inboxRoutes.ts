import { Elysia } from "elysia";
import { authPlugin } from "../plugins/auth";
import { listInbox } from "../controllers/inboxController";

export const inboxRoutes = new Elysia()
  .use(authPlugin)
  .get("/inbox", ({ query, store }) => listInbox({ projectId: (query as any)?.projectId, userId: (store as any)?.user?.id }));


