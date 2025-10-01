import { Elysia } from "elysia";
import { loginController } from "../controllers/authController";

export const authRoutes = new Elysia().post(
  "/auth/login",
  async ({ request }) => {
    const body = await request.json();
    return loginController(body);
  }
);
