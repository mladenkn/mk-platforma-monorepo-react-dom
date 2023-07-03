import { defineConfig } from "@playwright/test"

export default defineConfig({
  // timeout: 300000,
  // globalTimeout: 6000000,
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3010",
  },
})
