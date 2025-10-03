import "dotenv/config";
import { Elysia } from "elysia";
import { createCorsPlugin } from "./lib/cors";

import { authRoutes } from "./routes/authRoutes";
import { authPlugin } from "./plugins/auth";
import { errorPlugin } from "./lib/errors";
import { projectRoutes } from "./routes/projectRoutes";
import { teamRoutes } from "./routes/teamRoutes";
import { issueRoutes } from "./routes/issueRoutes";
import { inboxRoutes } from "./routes/inboxRoutes";
import { userRoutes } from "./routes/userRoutes";
import { workspaceRoutes } from "./routes/workspaceRoutes";

const app = new Elysia();

app.use(createCorsPlugin());
app.use(authRoutes);
app.use(errorPlugin);
app.use(projectRoutes);
app.use(teamRoutes);
app.use(issueRoutes);
app.use(inboxRoutes);
app.use(userRoutes);
app.use(workspaceRoutes);

app.use(authPlugin)
   .get("/me", ({ store }) => {
     return { user: store };
   });

const port = Number(process.env.PORT || 3000);

const start = async () => {
  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}`);
};

start();
