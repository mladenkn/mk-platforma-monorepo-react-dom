import { test, expect } from "@playwright/test"

// test("should navigate to the about page", async ({ page }) => {
//   // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
//   await page.goto("http://localhost:3000/")
//   // Find an element with the text 'About Page' and click on it
//   await page.click("text=About")
//   // The new URL should be "/about" (baseURL is used there)
//   await expect(page).toHaveURL("http://localhost:3000/about")
//   // The new page should contain an h1 with "About Page"
//   await expect(page.locator("h1")).toContainText("About Page")
// })

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/")

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
})

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/")

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click()

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/)
})

test("first", async ({ page }) => {
  await page.goto("http://localhost:3000")
  await page.locator("_react=Header_moreOptions").click()
  await page.locator("_react=Header_moreOptions").locator("_react=PostAddIcon").click()
  await expect(page).toHaveURL(/.*signin/)
  await page.locator("input#input-email-for-email-provider").fill("mladen.knezovic.1993@gmail.com")
  await page.locator("button#submitButton").click()
})
