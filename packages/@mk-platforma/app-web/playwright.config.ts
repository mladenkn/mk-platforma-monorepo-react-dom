import { defineConfig } from "@playwright/test"

export default defineConfig({
  timeout: 300000,
  globalTimeout: 6000000,
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3010",
  },
  webServer: {
    command: "pnpm _c dev.test",
    url: "http://localhost:3010",
    reuseExistingServer: true,
  },
})
