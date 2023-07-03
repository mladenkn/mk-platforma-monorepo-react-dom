import { test, expect, Page } from "@playwright/test"

test("Post CRUD", async ({ page }) => {
  // home
  await page.goto("/")
  await page.getByTestId("Header_moreOptions").click()
  await page.getByTestId("Header_moreOptions__PostAddIcon").click()
  // end home

  const newPost = getNewPost()

  // create
  await page.waitForURL(/.*post\/create/)
  await expect(page).toHaveURL(/.*post\/create/)
  const form = await form_fill(page, newPost)
  await form_expect(page, newPost)
  await form.submit()
  // end create

  // details
  await page.waitForURL(/\/post\/\d+$/)
  await expect(page).toHaveURL(/\/post\/\d+$/)
  await details_expect(page, newPost)
  // end details

  const newPost_id = parseInt(page.url().match(/\/post\/(\d+)/)?.[1]!)

  // list
  await page.goto("/")
  await page.waitForURL("/")
  const post_list_item = await postList_expectItem(page, newPost, newPost_id)
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
  await form_expect(page, newPost)
  const newPost_edited = {
    title: "post 1 title edited",
    description: "post 1 description edited",
    contact: "2222",
    category: "Gadgeti",
    location: "Zagreb",
  }
  const form2 = await form_fill(page, newPost_edited)
  await form_expect(page, newPost_edited)
  await form2.submit()
  // end edit

  // details 2
  await page.waitForURL(/\/post\/\d+$/)
  await expect(page).toHaveURL(/\/post\/\d+$/)
  await details_expect(page, newPost_edited)
  // end details 2

  // list 2
  await page.goto("/")
  await page.waitForURL("/")
  const post_list_item2 = await postList_expectItem(page, newPost_edited, newPost_id)
  await post_list_item2.click()
  // end list 2
})

function getNewPost() {
  return {
    title: "post 1 title",
    description: "post 1 description",
    contact: "5185184",
    category: "Hrana",
    location: "Split",
  }
}
type Post = ReturnType<typeof getNewPost>

async function form_fill(page: Page, post: Post) {
  const form = page.getByTestId("Post_form")
  await form.locator("[name='title']").fill(post.title)
  await form.locator("[name='description']").fill(post.description)
  await form.locator("[name='contact']").fill(post.contact)

  await form.locator("[name='category']").click()
  await page.locator(".category-dropdown-popper").getByText(post.category).click()

  await form.locator("[name='location']").click()
  await page.locator(".location-dropdown-popper").getByText(post.location).click()

  return {
    submit: () => form.locator("button[type=submit]").click(),
  }
}

async function details_expect(page: Page, post: Post) {
  const post_component = page.getByTestId("Post_single_details")
  await expect(post_component).toContainText(post.title)
  await expect(post_component).toContainText(post.description)
  await expect(post_component).toContainText(post.contact)
  await expect(post_component).toContainText(post.location)
}

async function postList_expectItem(page: Page, post: Post, id: number) {
  const post_list_item = page.getByTestId(`Post_listItem-${id}`)
  await expect(post_list_item).toContainText(post.title)
  await expect(post_list_item).toContainText(post.location)
  return post_list_item
}

async function form_expect(page: Page, post: Post) {
  const form = page.getByTestId("Post_form")
  expect(form.locator("[name='title']")).toHaveValue(post.title)
  expect(form.locator("[name='contact']")).toHaveValue(post.contact)
  expect(form.locator("[name='description']")).toHaveValue(post.description)
  expect(form.locator("[name='category']")).toHaveValue(post.category)
  expect(form.locator("[name='location']")).toHaveValue(post.location)
}
