import cors from "@elysiajs/cors";

// Centralized and configurable CORS setup for the server
// Reads allowed origins from CORS_ORIGINS (comma-separated), otherwise falls back to * in development
export function createCorsPlugin() {
  const rawOrigins = process.env.CORS_ORIGINS?.trim();
  const isProd = process.env.NODE_ENV === "production";

  // Parse allowed origins list
  const allowedOrigins = rawOrigins
    ? rawOrigins.split(",").map((o) => o.trim()).filter(Boolean)
    : isProd
    ? []
    : ["*"];

  // When in production and no origins are configured, default to denying all except same-origin
  // Encourage explicit configuration via environment variable.
  const originOption = allowedOrigins.length === 1 && allowedOrigins[0] === "*"
    ? "*"
    : (requestOrigin: string | undefined) => {
        if (!requestOrigin) return false;
        if (allowedOrigins.includes(requestOrigin)) return true;
        // Support subdomain wildcard like .example.com if configured with leading dot
        for (const allowed of allowedOrigins) {
          if (allowed.startsWith(".")) {
            if (requestOrigin.endsWith(allowed)) return true;
          }
        }
        return false;
      };

  return cors({
    origin: originOption as any,
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    credentials: true,
    maxAge: 600, // 10 minutes for preflight caching
    preflight: true,
    // exposeHeaders can be extended as needed
    exposeHeaders: ["Content-Length", "X-Request-Id"],
  });
}


