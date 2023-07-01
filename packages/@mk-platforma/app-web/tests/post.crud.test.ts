import { test, expect } from "@playwright/test"

test("Post CRUD", async ({ page }) => {
  // home
  await page.goto("/")
  await page.getByTestId("Header_moreOptions").click()
  await page.getByTestId("Header_moreOptions__PostAddIcon").click()
  // end home

  const newPost = {
    title: "post 1 title",
    description: "post 1 description",
    contact: "5185184",
    category: "Hrana",
    location: "Split",
  }

  // create
  await page.waitForURL(/.*post\/create/)
  await expect(page).toHaveURL(/.*post\/create/)

  const form = page.getByTestId("Post_form")
  await form.locator("[name='title']").fill(newPost.title)
  await form.locator("[name='description']").fill(newPost.description)
  await form.locator("[name='contact']").fill(newPost.contact)

  await form.locator("[name='category']").click()
  await page.locator(".category-dropdown-popper").getByText(newPost.category).click()

  await form.locator("[name='location']").click()
  await page.locator(".location-dropdown-popper").getByText(newPost.location).click()

  await form.locator("button[type=submit]").click()
  // end create

  // details
  await page.waitForURL(/\/post\/\d+$/)
  await expect(page).toHaveURL(/\/post\/\d+$/)

  const post_component = page.getByTestId("Post_single_details")
  await expect(post_component).toContainText(newPost.title)
  await expect(post_component).toContainText(newPost.description)
  await expect(post_component).toContainText(newPost.contact)
  await expect(post_component).toContainText(newPost.location)
  // end details

  const newPost_id = parseInt(page.url().match(/\/post\/(\d+)/)?.[1]!)

  // list
  await page.goto("/")
  await page.waitForURL("/")

  const post_list_item = page.getByTestId(`Post_listItem-${newPost_id}`)
  await expect(post_list_item).toContainText(newPost.title)
  await expect(post_list_item).toContainText(newPost.location)
  await post_list_item.click()
  // end list

  // details
  await page.waitForURL(`/post/${newPost_id}`)
  await expect(page).toHaveURL(`/post/${newPost_id}`)

  const editLink = page.locator(`a[href="/post/edit/${newPost_id}"]`)
  await expect(editLink).toBeVisible()
  await editLink.click()
  // end details

  // edit
  await page.waitForURL(`/post/edit/${newPost_id}`)
  await expect(page).toHaveURL(`/post/edit/${newPost_id}`)

  const form2 = page.getByTestId("Post_form")
  expect(form2.locator("[name='title']")).toHaveValue(newPost.title)
  expect(form2.locator("[name='contact']")).toHaveValue(newPost.contact)
  expect(form2.locator("[name='description']")).toHaveValue(newPost.description)
  expect(form2.locator("[name='category']")).toHaveValue(newPost.category)
  expect(form2.locator("[name='location']")).toHaveValue(newPost.location)
  // end edit
})
