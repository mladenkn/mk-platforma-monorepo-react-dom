import { defineConfig } from "@playwright/test"

export default defineConfig({
  timeout: 30000,
  globalTimeout: 600000,
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
  },
})
