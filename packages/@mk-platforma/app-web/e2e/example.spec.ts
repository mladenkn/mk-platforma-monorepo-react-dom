import { test, expect } from "@playwright/test"

test("first", async ({ page }) => {
  await page.goto("http://localhost:3000")
  await page.locator("_react=Header_moreOptions").click()
  await page.locator("_react=Header_moreOptions").locator("_react=PostAddIcon").click()
  await page.waitForURL(/.*post\/create/)
  await expect(page).toHaveURL(/.*post\/create/)

  const newPost = {
    title: "post 1 title",
    description: "post 1 description",
    contact: "5185184",
    category: "Hrana",
    location: "Split",
  }

  const fields = page.locator("_react=Post_form_fields")
  await fields.locator("[name='title']").fill(newPost.title)
  await fields.locator("[name='description']").fill(newPost.description)
  await fields.locator("[name='contact']").fill(newPost.contact)

  await fields.locator("[name='category']").click()
  await page.locator(".category-dropdown-popper").getByText(newPost.category).click()

  await fields.locator("[name='location']").click()
  await page.locator(".location-dropdown-popper").getByText(newPost.location).click()
})
