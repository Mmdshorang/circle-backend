import { Elysia } from "elysia";
import { loginController } from "../controllers/authController";
import { LoginSchema } from "../lib/validation";

export const authRoutes = new Elysia().post(
  "/auth/login",
  async ({ request, set }) => {
    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      set.status = 400;
      return { ok: false, error: { message: parsed.error.message } };
    }
    return loginController(parsed.data);
  }
);
