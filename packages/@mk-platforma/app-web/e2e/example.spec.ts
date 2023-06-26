import { test, expect } from "@playwright/test"

test("first", async ({ page }) => {
  await page.goto("http://localhost:3000")
  await page.locator("_react=Header_moreOptions").click()
  await page.locator("_react=Header_moreOptions").locator("_react=PostAddIcon").click()
  await page.waitForURL(/.*post\/create/)
  await expect(page).toHaveURL(/.*post\/create/)

  const fields = page.locator("_react=Post_form_fields")
  await fields.locator("[name='title']").fill("post 1 title")
  await fields.locator("[name='description']").fill("post 1 description")
  await fields.locator("[name='contact']").fill("584484")

  await fields.locator("[name='categories']").click()
  await page.locator(".categories-dropdown-popper").getByText("Hrana").click()
})
