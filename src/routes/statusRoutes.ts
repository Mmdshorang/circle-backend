import { Elysia } from "elysia";
import { authPlugin } from "../plugins/auth";
import { listHealths, listLabels, listStatuses } from "../controllers/statusController";

export const statusRoutes = new Elysia()
  .use(authPlugin)
  .get('/statuses', () => listStatuses())
  .get('/healths', () => listHealths())
  .get('/labels', () => listLabels());


