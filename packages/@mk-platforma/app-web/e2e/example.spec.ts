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

  const form = page.locator("_react=Post_form")
  await form.locator("[name='title']").fill(newPost.title)
  await form.locator("[name='description']").fill(newPost.description)
  await form.locator("[name='contact']").fill(newPost.contact)

  await form.locator("[name='category']").click()
  await page.locator(".category-dropdown-popper").getByText(newPost.category).click()

  await form.locator("[name='location']").click()
  await page.locator(".location-dropdown-popper").getByText(newPost.location).click()

  await form.locator("button[type=submit]").click()

  await page.waitForURL(/\/post\/\d+$/)
  await expect(page).toHaveURL(/\/post\/\d+$/)

  const newPost_id = parseInt(page.url().match(/\/post\/(\d+)/)?.[1]!)

  const post_component = page.locator("_react=Post_single_details")
  await expect(post_component).toContainText(newPost.title)
  await expect(post_component).toContainText(newPost.description)
  await expect(post_component).toContainText(newPost.contact)
  await expect(post_component).toContainText(newPost.location)

  await page.goto("http://localhost:3000")
  await page.waitForURL("http://localhost:3000")

  const post_list_item = page.locator(`_react=Post_listItem[id = ${newPost_id}]`)
  // await expect(post_list_item).toContainText(newPost.title)
  // await expect(post_list_item).toContainText(newPost.location)

  await post_list_item.click()
  await page.waitForURL(`http://localhost:3000/post/${newPost_id}`)
  await expect(page).toHaveURL(`http://localhost:3000/post/${newPost_id}`)

  const editLink = page.locator(`a[href="/post/edit/${newPost_id}"]`)
  await expect(editLink).toBeVisible()

  await editLink.click()
  await page.waitForURL(`http://localhost:3000/post/edit/${newPost_id}`)
  await expect(page).toHaveURL(`http://localhost:3000/post/edit/${newPost_id}`)
})
