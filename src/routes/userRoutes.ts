import { Elysia } from "elysia";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

export const userRoutes = new Elysia()
  .get("/users", async () => getUsers())
  .get("/users/:id", ({ params }) => getUser({ id: (params as any).id }))
  .post("/users", async ({ request, set }) => {
    const body = await request.json();
    // اعتبارسنجی ساده
    if (!body.name || !body.email) {
      set.status = 400;
      return { ok: false, error: "Name and email are required" };
    }
    return createUser(body);
  })
  .patch("/users/:id", async ({ params, request, set }) => {
    const body = await request.json();
    return updateUser({ id: (params as any).id }, body);
  })
  .delete("/users/:id", ({ params }) => deleteUser({ id: (params as any).id }));
