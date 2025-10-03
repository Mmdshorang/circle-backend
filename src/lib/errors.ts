import { Elysia } from "elysia";

export const errorPlugin = new Elysia()
  .onError(({ code, error, set }) => {
    const statusByCode: Record<string, number> = {
      VALIDATION: 400,
      NOT_FOUND: 404,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      INTERNAL_SERVER_ERROR: 500,
    };

    const status = statusByCode[code] ?? 500;
    set.status = status;
    return {
      ok: false,
      error: {
        code,
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
    };
  });

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}


