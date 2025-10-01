import "dotenv/config";
import { Elysia } from "elysia";

import { authRoutes } from "./routes/authRoutes";
import { authPlugin } from "./plugins/auth";

const app = new Elysia();

app.use(authRoutes);

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
