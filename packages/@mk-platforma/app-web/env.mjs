// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string().optional(),
    USERS_WHO_CAN_MUTATE: z.string().optional(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    USERS_WHO_CAN_MUTATE: process.env.USERS_WHO_CAN_MUTATE,
  },
})

const env_mapped = {
  ...env,
  USERS_WHO_CAN_MUTATE: env.USERS_WHO_CAN_MUTATE?.split(",").map(strNum => parseInt(strNum)) ?? []
}

export default env_mapped
