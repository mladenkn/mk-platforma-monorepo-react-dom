import { test, expect } from "@playwright/test"
import Post_crud_test_helper_create from "./post.crud.test.helper"

test("Post CRUD", async ({ page }) => {
  const helper = Post_crud_test_helper_create(page)

  // home
  await page.goto("/")
  await page.getByTestId("Header_moreOptions").click()
  await page.getByTestId("Header_moreOptions__PostAddIcon").click()
  // end home

  const newPost = getNewPost()

  // create
  await page.waitForURL(/.*post\/create/)
  await expect(page).toHaveURL(/.*post\/create/)
  const form = await helper.form.fill(newPost)
  await helper.form.expect(newPost)
  await form.submit()
  // end create

  // details
  await page.waitForURL(/\/post\/\d+$/)
  await expect(page).toHaveURL(/\/post\/\d+$/)
  await helper.details.expect(newPost)
  // end details

  const newPost_id = parseInt(page.url().match(/\/post\/(\d+)/)?.[1]!)

  // list
  await page.goto("/")
  await page.waitForURL("/")
  const post_list_item = await helper.list.expectItem(newPost, newPost_id)
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
  await helper.form.expect(newPost)
  const newPost_edited = {
    title: "post 1 title edited",
    description: "post 1 description edited",
    contact: "2222",
    category: "Gadgeti",
    location: "Zagreb",
  }
  const form2 = await helper.form.fill(newPost_edited)
  await helper.form.expect(newPost_edited)
  await form2.submit()
  // end edit

  // details 2
  await page.waitForURL(/\/post\/\d+$/)
  await expect(page).toHaveURL(/\/post\/\d+$/)
  await helper.details.expect(newPost_edited)
  // end details 2

  // list 2
  await page.goto("/")
  await page.waitForURL("/")
  const post_list_item2 = await helper.list.expectItem(newPost_edited, newPost_id)
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
