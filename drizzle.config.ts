import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "file:./data/dev.db",
  },
  strict: true,
  verbose: true,
} satisfies Config;
