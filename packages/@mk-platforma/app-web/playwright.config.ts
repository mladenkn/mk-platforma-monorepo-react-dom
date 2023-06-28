import { asNonNil } from "@mk-libs/common/common"
import { defineConfig } from "@playwright/test"

export default defineConfig({
  timeout: 300000,
  globalTimeout: 6000000,
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3010",
  },
  webServer: {
    command: asNonNil(process.env.TEST_SERVER_COMMAND),
    url: "http://localhost:3010",
    reuseExistingServer: true,
  },
})
