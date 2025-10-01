import jwt from "jsonwebtoken";
import { Elysia } from "elysia";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authPlugin = new Elysia().derive(async ({ request, set }) => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return { user: null };

  const token = authHeader.split(" ")[1];
  if (!token) {
    set.status = 401;
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { user: decoded };
  } catch (err) {
    set.status = 401;
    throw new Error("Invalid token");
  }
});
