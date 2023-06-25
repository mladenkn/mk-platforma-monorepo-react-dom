// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const wrapped = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URL: z.string().url().optional(),
    NODE_ENV: z.string().optional(),
    MOCK_USER_ID: z.string().optional(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_MOCK_USER_ID: z.string().optional(),
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
    MOCK_USER_ID: process.env.MOCK_USER_ID,
    NEXT_PUBLIC_MOCK_USER_ID: process.env.NEXT_PUBLIC_MOCK_USER_ID,
  },
})

const env = {
  ...wrapped,
  MOCK_USER_ID: wrapped.MOCK_USER_ID ? parseInt(wrapped.MOCK_USER_ID) : undefined,
  NEXT_PUBLIC_MOCK_USER_ID: wrapped.NEXT_PUBLIC_MOCK_USER_ID ? parseInt(wrapped.NEXT_PUBLIC_MOCK_USER_ID) : undefined,
}

export default env 
